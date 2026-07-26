import React, { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { useReceipts } from "@/hooks/useReceipts";
import { usePurchases } from "@/hooks/usePurchases";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import { UploadCloud, FileText, Image as ImageIcon, Trash2, Download, Eye, Link as LinkIcon, X, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Receipts() {
  const { receipts, addReceipt, deleteReceipt, updateReceipt } = useReceipts();
  const { purchases } = usePurchases();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [previewReceipt, setPreviewReceipt] = useState<any>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(Array.from(files));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
    }
  };

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
        toast.error(`${file.name} is not a supported format.`);
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        addReceipt({
          fileName: file.name,
          dataUrl,
        });
        toast.success(`Uploaded ${file.name}`);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this receipt?")) {
      deleteReceipt(id);
      toast.success("Receipt deleted");
    }
  };

  const handleDownload = (receipt: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = receipt.dataUrl;
    a.download = receipt.fileName;
    a.click();
  };

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Receipts Gallery</h2>
          <Button onClick={() => fileInputRef.current?.click()}>
            <UploadCloud size={16} className="mr-2" /> Upload Receipt
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*,application/pdf" 
            multiple 
            onChange={handleFileUpload}
          />
        </div>

        {/* Drag & Drop Area */}
        <div 
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors text-center ${isDragActive ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted/30'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="bg-primary/10 text-primary p-3 rounded-full mb-3">
            <UploadCloud size={24} />
          </div>
          <p className="font-medium">Click or drag files to upload</p>
          <p className="text-sm text-muted-foreground mt-1">Supports JPG, PNG, WebP, and PDF</p>
        </div>

        {/* Gallery Grid */}
        {receipts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {receipts.map(receipt => {
              const isImage = receipt.dataUrl.startsWith("data:image");
              return (
                <Card 
                  key={receipt.id} 
                  className="overflow-hidden hover-elevate transition-all cursor-pointer group"
                  onClick={() => setPreviewReceipt(receipt)}
                >
                  <div className="aspect-square bg-muted/30 relative flex items-center justify-center overflow-hidden border-b border-border">
                    {isImage ? (
                      <img src={receipt.dataUrl} alt={receipt.fileName} className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={48} className="text-muted-foreground" />
                    )}
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => { e.stopPropagation(); setPreviewReceipt(receipt); }}>
                        <Eye size={14} />
                      </Button>
                      <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => handleDownload(receipt, e)}>
                        <Download size={14} />
                      </Button>
                      <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={(e) => handleDelete(receipt.id, e)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate" title={receipt.fileName}>{receipt.fileName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{format(new Date(receipt.uploadedAt), "MMM d, yyyy")}</p>
                    
                    {receipt.purchaseId ? (
                      <div className="mt-2 text-xs flex items-center gap-1 text-primary">
                        <LinkIcon size={10} /> Linked
                      </div>
                    ) : (
                      <div className="mt-2 text-xs flex items-center gap-1 text-muted-foreground">
                        <AlertTriangle size={10} /> Unlinked
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <FileText size={48} className="mx-auto mb-4 opacity-20" />
            <p>No receipts uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewReceipt} onOpenChange={(open) => !open && setPreviewReceipt(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background border-border">
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div>
              <h3 className="font-medium truncate pr-4">{previewReceipt?.fileName}</h3>
              <p className="text-xs text-muted-foreground">{previewReceipt && format(new Date(previewReceipt.uploadedAt), "MMM d, yyyy h:mm a")}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={(e) => handleDownload(previewReceipt, e)}>
                <Download size={14} className="mr-2" /> Download
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setPreviewReceipt(null)}>
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/30 flex items-center justify-center p-4" style={{ height: "70vh" }}>
            {previewReceipt?.dataUrl.startsWith("data:image") ? (
              <img src={previewReceipt.dataUrl} alt="Preview" className="max-w-full max-h-full object-contain shadow-sm border border-border" />
            ) : (
              <iframe src={previewReceipt?.dataUrl} className="w-full h-full border rounded bg-white" title="PDF Preview" />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
