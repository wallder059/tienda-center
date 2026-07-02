import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Link as LinkIcon } from 'lucide-react';
import { uploadService } from '@/services/uploadService';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}

/**
 * Componente para subir imagen a Cloudinary o ingresar URL manual.
 */
export const ImageUpload = ({ value, onChange, error }: ImageUploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    try {
      const url = await uploadService.uploadImage(file);
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error al subir imagen');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'upload' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setMode('upload')}
        >
          <ImagePlus className="h-4 w-4" />
          Subir imagen
        </Button>
        <Button
          type="button"
          variant={mode === 'url' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setMode('url')}
        >
          <LinkIcon className="h-4 w-4" />
          URL manual
        </Button>
      </div>

      {mode === 'upload' ? (
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-dark-600 bg-dark-800/50 p-8 transition-colors hover:border-primary-500/50"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          ) : value ? (
            <img src={value} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
          ) : (
            <ImagePlus className="h-10 w-10 text-dark-500" />
          )}
          <p className="text-sm text-dark-400">
            {uploading ? 'Subiendo...' : 'Haz clic para seleccionar una imagen'}
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <Input
          placeholder="https://res.cloudinary.com/..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {(error || uploadError) && (
        <p className="text-sm text-red-400">{error ?? uploadError}</p>
      )}
    </div>
  );
};
