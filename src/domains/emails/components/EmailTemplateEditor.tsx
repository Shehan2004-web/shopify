'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/shared/ui/atoms/Typography';
import { Button } from '@/shared/ui/atoms/Button';
import { EmailTrigger } from '../types';
import { cn } from '@/shared/lib/utils';
import { 
  Save, Sparkles, 
  Bold, Italic, Underline, 
  List, ListOrdered, Link2, Image as ImageIcon, 
  LucideIcon, Heading1, Heading2, Table as TableIcon,
  Eye, X
} from 'lucide-react';

interface EmailTemplateEditorProps {
  trigger: EmailTrigger | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<EmailTrigger>) => void;
}

const MERGE_TAGS = [
  { label: 'Customer Name', tag: '{{customer_name}}' },
  { label: 'Order ID', tag: '{{order_id}}' },
  { label: 'Refund Amount', tag: '{{refund_amount}}' },
  { id: 'store_name', label: 'Store Name', tag: '{{store_name}}' },
  { id: 'rejection_reason', label: 'Rejection Reason', tag: '{{rejection_reason}}' },
  { id: 'credit_code', label: 'Credit Code', tag: '{{credit_code}}' },
];

export const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({ trigger, isOpen, onClose, onSave }) => {
  const [subject, setSubject] = React.useState('');
  const [activeTools, setActiveTools] = React.useState<string[]>([]);
  const [showTableGrid, setShowTableGrid] = React.useState(false);
  const [hoveredGrid, setHoveredGrid] = React.useState({ r: 0, c: 0 });
  const [showLinkModal, setShowLinkModal] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState('https://');
  const [savedRange, setSavedRange] = React.useState<Range | null>(null);
  
  const editorRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (trigger) {
      setSubject(trigger.subject);
      // Wait for modal transition/render before setting innerHTML
      setTimeout(() => {
        if (editorRef.current && editorRef.current.innerHTML !== trigger.body) {
          editorRef.current.innerHTML = trigger.body;
        }
      }, 50);
    }
  }, [trigger, isOpen]);

  if (!isOpen || !trigger) return null;

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (savedRange && window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedRange);
      }
    }
  };

  const executeAction = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, value);
    
    setActiveTools(prev => 
      prev.includes(command) ? prev.filter(t => t !== command) : [...prev, command]
    );
  };

  const insertVariable = (tag: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    
    const span = document.createElement('span');
    span.className = "bg-neutral-100 text-[#0c2e2e] px-2 py-0.5 rounded-md font-mono text-[12px] border border-neutral-200 mx-0.5 pointer-events-none select-none font-black";
    span.textContent = tag;
    
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(span);
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editorRef.current.appendChild(span);
    }
  };

  const handleLinkSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setShowLinkModal(false);
    executeAction('createLink', linkUrl);
    setLinkUrl('https://');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        executeAction('insertImage', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertTable = (rows: number, cols: number) => {
    let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 24px 0; border: 2px solid #cbd5e1; border-radius: 8px; overflow: hidden;"><thead><tr style="background-color: #f8fafc;">`;
    for (let j = 0; j < cols; j++) {
      tableHtml += `<th style="padding: 14px; border: 2px solid #cbd5e1; text-align: left; font-size: 13px; font-weight: 800; color: #475569;">Header ${j+1}</th>`;
    }
    tableHtml += `</tr></thead><tbody>`;
    for (let i = 1; i < rows; i++) {
      tableHtml += `<tr>`;
      for (let j = 0; j < cols; j++) {
        tableHtml += `<td style="padding: 14px; border: 2px solid #cbd5e1; min-width: 60px; font-size: 14px; color: #64748b;">&nbsp;</td>`;
      }
      tableHtml += `</tr>`;
    }
    tableHtml += `</tbody></table><p><br></p>`;
    
    if (editorRef.current) editorRef.current.focus();
    restoreSelection();
    
    executeAction('insertHTML', tableHtml);
    setShowTableGrid(false);
  };

  const handleSave = () => {
    if (editorRef.current) {
      onSave({ subject, body: editorRef.current.innerHTML });
      onClose();
    }
  };

  const ToolButton = ({ icon: Icon, id, action, label, groupEnd }: { icon: LucideIcon, id: string, action: () => void, label?: string, groupEnd?: boolean }) => {
    const isActive = activeTools.includes(id);
    return (
      <div className="flex items-center">
        <button
          onMouseDown={(e) => { 
            e.preventDefault();
            saveSelection();
            action(); 
          }}
          className={cn(
            "h-9 px-2.5 flex items-center justify-center rounded-xl transition-all duration-200 gap-2 hover:shadow-sm",
            isActive 
              ? "bg-brand-teal/10 text-brand-teal ring-1 ring-brand-teal/20" 
              : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
          {label && <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>}
        </button>
        {groupEnd && <div className="h-5 w-[1px] bg-neutral-200 mx-3 hidden sm:block" />}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-neutral-900/40 transition-opacity" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-6xl h-full max-h-[96vh] flex flex-col bg-[#f4f6f8] rounded-none sm:rounded-[40px] shadow-2xl overflow-hidden"
      >
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />

        {/* Editor Modal Header */}
        <header className="p-6 sm:p-8 bg-white border-b border-neutral-200 flex items-center justify-between relative z-[70] flex-shrink-0">
          <div className="flex items-center gap-5">
            <div className="h-12 w-12 rounded-[18px] bg-[#0c2e2e] flex items-center justify-center text-white font-black text-xl shadow-xl shadow-brand-teal/20 border-b-4 border-black/20">
              {trigger.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                 <h2 className="text-[20px] font-black text-neutral-900 tracking-tight leading-none">{trigger.name}</h2>
                 <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-md border border-emerald-200">System Live</span>
              </div>
              <p className="text-[12px] text-neutral-400 font-bold uppercase tracking-[0.15em] mt-2 flex items-center gap-2">
                 Visual Workflow Editor <div className="h-1 w-1 bg-neutral-200 rounded-full" /> <span className="text-brand-teal">Drafting Changes</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={onClose} className="px-5 h-10 rounded-xl text-[13px] font-bold text-neutral-500 hover:bg-neutral-50 transition-all border border-transparent hover:border-neutral-200">
                Cancel
             </button>
             <Button variant="primary" onClick={handleSave} className="h-11 px-8 rounded-2xl bg-[#0c2e2e] text-white hover:bg-neutral-900 shadow-xl shadow-neutral-900/20 font-black text-[12px] uppercase tracking-widest border-b-4 border-black/30 hover:border-b-2 active:border-b-0 active:translate-y-1 transition-all">
                <Save className="h-4 w-4 mr-2.5" /> Save Template
             </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto w-full custom-scrollbar pb-12">
           <div className="max-w-5xl mx-auto p-4 sm:p-10 space-y-12">
              
              {/* Subject Area */}
              <section className="bg-white p-6 sm:p-10 rounded-[40px] border border-neutral-100 shadow-xl shadow-black/[0.02] space-y-5">
                 <div className="flex items-center justify-between">
                    <Typography variant="small" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2.5">
                       <div className="h-2 w-2 rounded-full bg-brand-teal" /> Email Subject Line
                    </Typography>
                    <div className="flex items-center gap-3 text-neutral-300">
                       <Sparkles className="h-4 w-4" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">AI Assisted</span>
                    </div>
                 </div>
                 <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject line..."
                  className="w-full h-14 sm:h-20 bg-neutral-50 border-2 border-transparent focus:border-brand-teal focus:bg-white rounded-[24px] px-8 text-[18px] sm:text-[22px] font-black text-neutral-900 focus:outline-none transition-all shadow-inner"
                />
              </section>

              {/* MAIN EDITOR */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between px-3">
                    <Typography variant="small" className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">Email Body Canvas</Typography>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-2 text-neutral-400">
                          <Eye className="h-4 w-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
                       </div>
                       <div className="h-4 w-[1px] bg-neutral-200" />
                       <code className="text-[10px] font-bold text-neutral-300">UTF-8 / Rich HTML</code>
                    </div>
                 </div>

                 <div className="border border-neutral-200 rounded-[48px] overflow-hidden bg-white shadow-2xl shadow-black/[0.05]">
                    <div className="bg-white border-b border-neutral-100 px-8 py-5 flex flex-wrap items-center justify-between sticky top-0 z-[80] gap-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
                       <div className="flex items-center flex-wrap gap-1">
                          <ToolButton icon={Heading1} id="h1" action={() => executeAction('formatBlock', 'H1')} label="H1" />
                          <ToolButton icon={Heading2} id="h2" action={() => executeAction('formatBlock', 'H2')} label="H2" groupEnd />
                          
                          <ToolButton icon={Bold} id="bold" action={() => executeAction('bold')} />
                          <ToolButton icon={Italic} id="italic" action={() => executeAction('italic')} />
                          <ToolButton icon={Underline} id="underline" action={() => executeAction('underline')} groupEnd />
                          
                          <ToolButton icon={List} id="bullet" action={() => executeAction('insertUnorderedList')} />
                          <ToolButton icon={ListOrdered} id="ordered" action={() => executeAction('insertOrderedList')} groupEnd />
                          
                          <ToolButton icon={Link2} id="link" action={() => { saveSelection(); setShowLinkModal(true); }} />
                          <ToolButton icon={ImageIcon} id="image" action={() => fileInputRef.current?.click()} />
                          <ToolButton icon={TableIcon} id="table" action={() => setShowTableGrid(!showTableGrid)} label="Table" />
                       </div>
                    </div>

                    <div className="relative bg-white p-8 sm:p-20 cursor-text min-h-[600px] selection:bg-brand-teal/10">
                       <div
                         ref={editorRef}
                         contentEditable="true"
                         onClick={saveSelection}
                         onKeyUp={saveSelection}
                         className="w-full min-h-[400px] focus:outline-none text-[17px] leading-[1.8] text-neutral-700 font-medium prose prose-neutral max-w-none prose-h1:text-[36px] prose-h1:font-black prose-h1:tracking-tighter prose-h1:mb-10 prose-h2:text-[24px] prose-h2:font-extrabold prose-p:mb-6"
                         style={{ outline: 'none' }}
                       />
                    </div>
                 </div>
              </section>

              {/* Insert Tags */}
              <section className="p-10 bg-[#0c2e2e] rounded-[48px] shadow-2xl shadow-black/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 h-64 w-64 bg-brand-teal/20 blur-[120px] -mr-32 -mt-32 group-hover:bg-brand-teal/40 transition-all duration-700" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-teal border border-white/10">
                             <Sparkles className="h-6 w-6" />
                          </div>
                          <div>
                             <h3 className="text-[16px] font-black text-white uppercase tracking-[0.2em] leading-none">Dynamic Field Injector</h3>
                             <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Enterprise-grade merge tags</p>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                       {MERGE_TAGS.map((tag) => (
                         <button
                           key={tag.tag}
                           onClick={() => insertVariable(tag.tag)}
                           className="px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[13px] font-black text-white/90 hover:bg-white hover:text-[#0c2e2e] transition-all duration-300 flex items-center gap-3 active:scale-95"
                         >
                           <span>{tag.label}</span>
                           <code className="text-[11px] text-brand-teal font-mono font-bold">{tag.tag}</code>
                         </button>
                       ))}
                    </div>
                 </div>
              </section>
           </div>
        </div>

        {/* LINK MODAL (Scoped inside the Editor Modal) */}
        <AnimatePresence>
          {showLinkModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[100] bg-[#0c2e2e]/80 backdrop-blur-xl flex items-center justify-center p-8"
            >
              <div className="bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl">
                 <h3 className="text-xl font-black text-neutral-900 mb-6">Insert Link</h3>
                 <form onSubmit={handleLinkSubmit} className="space-y-4">
                    <input 
                      autoFocus
                      type="text" 
                      value={linkUrl} 
                      onChange={(e) => setLinkUrl(e.target.value)}
                      className="w-full h-14 bg-neutral-50 border-2 border-transparent focus:border-brand-teal rounded-2xl px-6 text-[15px] font-bold focus:outline-none shadow-inner"
                    />
                    <div className="flex gap-3 mt-8">
                       <Button type="button" variant="outline" onClick={() => setShowLinkModal(false)} className="flex-1 h-12 rounded-2xl border-neutral-200 text-neutral-500 font-bold uppercase text-[12px]">Cancel</Button>
                       <Button type="submit" variant="primary" className="flex-1 h-12 rounded-2xl bg-[#0c2e2e] text-white font-bold uppercase text-[12px]">Insert Link</Button>
                    </div>
                 </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TABLE GRID (Scoped inside the Editor Modal) */}
        <AnimatePresence>
          {showTableGrid && !showLinkModal && (
            <div className="absolute inset-0 z-[90] pointer-events-none">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="pointer-events-auto absolute top-[140px] right-[100px] p-6 bg-white rounded-[32px] shadow-2xl border border-neutral-100 min-w-[300px]"
               >
                 <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Dimensions Selector</span>
                    <button onClick={() => setShowTableGrid(false)} className="text-neutral-300 hover:text-rose-500 transition-colors"><X className="h-4 w-4" /></button>
                 </div>
                 <div className="grid grid-cols-10 gap-1.5 mb-6" onMouseLeave={() => setHoveredGrid({ r: 0, c: 0 })}>
                    {Array.from({ length: 100 }).map((_, i) => {
                      const r = Math.floor(i / 10) + 1;
                      const c = (i % 10) + 1;
                      const isActive = r <= hoveredGrid.r && c <= hoveredGrid.c;
                      return (
                        <div key={i} onMouseEnter={() => setHoveredGrid({ r, c })} onClick={() => insertTable(r, c)} className={cn("h-4 w-4 rounded-sm border-2 transition-all cursor-pointer", isActive ? "bg-brand-teal border-brand-teal" : "bg-neutral-50 border-neutral-100 hover:border-brand-teal/30")} />
                      );
                    })}
                 </div>
                 <div className="text-center py-3 bg-brand-teal/5 rounded-2xl border border-brand-teal/10">
                    <span className="text-[12px] font-black text-brand-teal uppercase tracking-[0.1em]">{hoveredGrid.r} x {hoveredGrid.c} Cells</span>
                 </div>
               </motion.div>
            </div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
