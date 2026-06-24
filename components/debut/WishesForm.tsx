"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Send as SendIcon, Image as PhotoIcon, CheckCircle as SuccessIcon, AlertCircle as ErrorIcon, Copy as CopyIcon, XCircle } from 'lucide-react';


interface Wish {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export const WishesForm = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; msg: string }>({ type: null, msg: '' });
  const [rescueMode, setRescueMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    // Generate object URLs for previews
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Cleanup URLs when files change or component unmounts
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    
    // Check if adding these files exceeds the limit of 2
    if (files.length + selectedFiles.length > 2) {
      alert("Maximum 2 images allowed.");
      return;
    }

    // Check size of each file
    for (const f of selectedFiles) {
      if (f.size > 5 * 1024 * 1024) {
        alert(`File ${f.name} exceeds the 5MB size limit.`);
        return;
      }
    }

    setFiles(prev => [...prev, ...selectedFiles]);
    // Reset file input value so same file can be re-selected if removed
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRescueMode(false);
    setStatus({ type: 'loading', msg: '>> ESTABLISHING_UPLINK...' });

    try {
      let imageUrls: string[] = [];

      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('VISUAL_DATA_EXCEEDS_5MB_LIMIT');
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('wish-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('wish-images').getPublicUrl(filePath);
        if (data?.publicUrl) {
          imageUrls.push(data.publicUrl);
        }
      }

      const imageUrl = imageUrls.length > 0 ? imageUrls.join(',') : null;

      const { error: dbError } = await supabase
        .from('wishes')
        .insert([{ 
          name: formData.name, 
          message: formData.message, 
          image_url: imageUrl 
        }]);

      if (dbError) throw dbError;

      setStatus({ type: 'success', msg: '>> DATA_ARCHIVED_SUCCESSFULLY' });
      setFormData({ name: '', message: '' });
      setFiles([]);

    } catch (err: any) {
      console.error(err);
      const errorMsg = err.message || 'TRANSMISSION_FAILED';
      let statusMsg = `!! ERROR: ${errorMsg} !!`;

      const isStorageFull = 
        errorMsg.toLowerCase().includes('quota') || 
        errorMsg.toLowerCase().includes('exceeded') || 
        errorMsg.toLowerCase().includes('capacity') ||
        errorMsg.toLowerCase().includes('full') ||
        errorMsg.toLowerCase().includes('413') ||
        errorMsg.toLowerCase().includes('large') ||
        errorMsg.toLowerCase().includes('limit');

      if (isStorageFull) {
        statusMsg = `!! ERROR: MAINFRAME STORAGE FULL OR PAYLOAD TOO LARGE !!`;
      }

      setStatus({ type: 'error', msg: statusMsg });
      setRescueMode(true);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.message);
    alert("Data Packet Copied! Proceed to External Relay.");
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-dark-teal/10 border-2 border-neon-cyan/20 p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <SendIcon size={120} className="text-neon-cyan" />
        </div>
        
        <h3 className="text-sm font-ethnocentric text-neon-cyan mb-2 uppercase tracking-widest relative z-10">Transmit_Data</h3>
        <p className="text-xs text-gray-400 mb-12 font-mono tracking-wider uppercase relative z-10">Relay your message to the mainframe</p>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="group/field">
            <label className="block text-[10px] text-neon-cyan font-mono mb-3 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">Sender_Identity</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-neon-cyan outline-none transition-all placeholder:text-gray-800 font-mono"
              placeholder="ENTER_ID_PROTOCOL..."
            />
          </div>

          <div className="group/field">
            <label className="block text-[10px] text-neon-cyan font-mono mb-3 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">Data_Packet_Content</label>
            <textarea 
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-black/40 border border-white/10 p-4 text-sm text-white focus:border-neon-cyan outline-none transition-all placeholder:text-gray-800 resize-none font-mono"
              placeholder="ENTER_MESSAGE_STREAM..."
            />
          </div>

          <div className="group/field">
            <label className="block text-[10px] text-neon-green font-mono mb-3 uppercase tracking-[0.3em] group-focus-within/field:text-white transition-colors">Visual_Attachment (MAX_5MB, MAX 2 IMAGES)</label>
            <div className="relative group/file">
              <input 
                type="file" 
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={files.length >= 2}
                className="absolute inset-0 opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              <div className={`flex items-center gap-4 bg-black/40 border p-4 text-xs text-gray-500 transition-all ${files.length >= 2 ? 'border-white/5 opacity-50' : 'border-white/10 group-hover/file:border-neon-green'}`}>
                <PhotoIcon size={18} className="text-neon-green" />
                <span className="truncate font-mono">
                  {files.length === 0 ? 'UPLOAD_VISUAL_DATA...' : `${files.length} IMAGE(S) SELECTED (MAX 2)`}
                </span>
              </div>
            </div>

            {/* Image Preview List */}
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative w-28 h-28 border border-white/10 bg-black/40 p-1 group/img-preview">
                    <img 
                      src={url} 
                      alt={`Preview ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="absolute -top-2 -right-2 bg-black border border-neon-red/50 text-neon-red hover:text-white hover:bg-neon-red p-1 rounded-full transition-all shadow-[0_0_10px_rgba(255,0,0,0.3)] z-20"
                      title="Remove image"
                    >
                      <XCircle size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full h-16 flex items-center justify-center gap-4 font-ethnocentric text-[10px] tracking-widest transition-all ${loading ? 'bg-gray-900 text-gray-500 border border-white/5' : 'bg-neon-cyan text-black hover:bg-white hover:scale-[1.01] shadow-[0_0_30px_rgba(0,242,255,0.2)]'}`}
          >
            {loading ? 'UPLOADING_LOGS...' : (
              <>
                <SendIcon size={16} />
                UPLOAD_TO_MAINFRAME
              </>
            )}
          </button>
        </form>

        {status.type && (
          <div className={`mt-8 p-5 border-l-4 flex items-start gap-4 animate-fade-in ${status.type === 'success' ? 'bg-neon-green/5 border-neon-green text-neon-green' : status.type === 'error' ? 'bg-neon-red/5 border-neon-red text-neon-red' : 'bg-neon-cyan/5 border-neon-cyan text-neon-cyan'}`}>
            {status.type === 'success' ? <SuccessIcon size={18} /> : <ErrorIcon size={18} />}
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-bold font-ethnocentric tracking-widest uppercase">{status.type === 'success' ? 'STATUS_OK' : status.type === 'error' ? 'STATUS_FAIL' : 'STATUS_PENDING'}</span>
               <span className="text-[10px] font-mono leading-relaxed opacity-80">{status.msg}</span>
            </div>
          </div>
        )}

        {rescueMode && (
          <div className="mt-8 bg-black/80 border border-neon-red p-8 animate-shake relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-red"></div>
            <h4 className="text-neon-red font-ethnocentric text-[10px] mb-4 uppercase tracking-tighter flex items-center gap-2">
               <ErrorIcon size={14} /> !! RECOVERY_MODE_ACTIVE !!
            </h4>
            <p className="text-[10px] text-gray-400 mb-6 leading-relaxed font-mono uppercase tracking-wider">
              The mainframe storage capacity may be full or exceeded. Your message is preserved below. Proceed to external relay.
            </p>
            
            <div className="flex flex-col gap-4">
               <button 
                 onClick={copyToClipboard}
                 className="w-full border-2 border-neon-green/30 p-4 text-neon-green text-[10px] font-bold hover:bg-neon-green hover:text-black transition-all flex items-center justify-center gap-3"
               >
                 <CopyIcon size={16} />
                 COPY_BUFFERED_DATA
               </button>
               
               <a 
                 href="/gform" 
                 className="block w-full bg-neon-red text-white p-4 text-[10px] font-ethnocentric text-center hover:bg-white hover:text-neon-red transition-all tracking-widest"
               >
                 SUBMIT VIA GOOGLE FORM RELAY
               </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
