import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon, 
  MagnifyingGlassPlusIcon, 
  MagnifyingGlassMinusIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  title?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  alt, 
  title 
}) => {
  const { theme } = useTheme();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsFullscreen(false);
    }
  }, [isOpen]);

  // Handle zoom in
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev * 1.2, 3));
  }, []);

  // Handle zoom out
  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev / 1.2, 0.5));
  }, []);

  // Handle fit to screen
  const fitToScreen = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }, [zoomIn, zoomOut]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  }, [scale, position]);

  // Handle drag move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, scale, dragStart]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '=':
        case '+':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          fitToScreen();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          setIsFullscreen(prev => !prev);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, zoomIn, zoomOut, fitToScreen]);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${
          isFullscreen ? 'bg-black' : 
          theme === 'cyber' 
            ? 'bg-cyber-950/95' 
            : 'bg-black/90'
        }`}
        onClick={onClose}
      >
        {/* Backdrop blur */}
        <div className="absolute inset-0 backdrop-blur-sm" />
        
        {/* Controls */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-4 left-4 right-4 z-10 flex items-center justify-between ${
              theme === 'cyber' ? 'text-cyan-300' : 'text-white'
            }`}
          >
            {/* Title */}
            {title && (
              <h3 className={`text-lg font-semibold ${
                theme === 'cyber' ? 'cyber-text' : ''
              }`}>
                {title}
              </h3>
            )}
            
            <div className="flex items-center space-x-2 ml-auto">
              {/* Zoom controls */}
              <div className="flex items-center space-x-1 bg-black/50 rounded-lg p-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomOut();
                  }}
                  className={`p-2 rounded transition-colors ${
                    theme === 'cyber'
                      ? 'hover:bg-cyan-500/20 hover:text-cyan-200'
                      : 'hover:bg-white/20'
                  }`}
                  title="Zoom Out (-)"
                >
                  <MagnifyingGlassMinusIcon className="w-5 h-5" />
                </button>
                
                <span className="text-sm px-2 min-w-[4rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    zoomIn();
                  }}
                  className={`p-2 rounded transition-colors ${
                    theme === 'cyber'
                      ? 'hover:bg-cyan-500/20 hover:text-cyan-200'
                      : 'hover:bg-white/20'
                  }`}
                  title="Zoom In (+)"
                >
                  <MagnifyingGlassPlusIcon className="w-5 h-5" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fitToScreen();
                  }}
                  className={`p-2 rounded transition-colors ${
                    theme === 'cyber'
                      ? 'hover:bg-cyan-500/20 hover:text-cyan-200'
                      : 'hover:bg-white/20'
                  }`}
                  title="Fit to Screen (0)"
                >
                  <ArrowsPointingInIcon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Fullscreen toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                className={`p-2 rounded transition-colors bg-black/50 ${
                  theme === 'cyber'
                    ? 'hover:bg-cyan-500/20 hover:text-cyan-200'
                    : 'hover:bg-white/20'
                }`}
                title="Toggle Fullscreen (F)"
              >
                <ArrowsPointingOutIcon className="w-5 h-5" />
              </button>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className={`p-2 rounded transition-colors bg-black/50 ${
                  theme === 'cyber'
                    ? 'hover:bg-red-500/20 hover:text-red-300'
                    : 'hover:bg-white/20'
                }`}
                title="Close (Esc)"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Image container */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ 
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
        >
          <motion.img
            ref={imageRef}
            src={imageUrl}
            alt={alt}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: scale,
              opacity: 1,
              x: position.x,
              y: position.y
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`max-w-none select-none ${
              isFullscreen ? 'w-full h-full object-contain' : 'max-h-[90vh] max-w-[90vw]'
            }`}
            style={{
              imageRendering: scale > 1 ? 'auto' : 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
        
        {/* Fullscreen close button */}
        {isFullscreen && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-colors bg-black/50 ${
              theme === 'cyber'
                ? 'text-cyan-300 hover:bg-red-500/20 hover:text-red-300'
                : 'text-white hover:bg-white/20'
            }`}
            title="Close (Esc)"
          >
            <XMarkIcon className="w-6 h-6" />
          </motion.button>
        )}
        
        {/* Instructions overlay */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 ${
              theme === 'cyber' ? 'text-cyan-400' : 'text-white/80'
            } text-sm text-center bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm`}
          >
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <span>Scroll: Zoom</span>
              <span>Drag: Pan</span>
              <span>+/-: Zoom</span>
              <span>0: Fit</span>
              <span>F: Fullscreen</span>
              <span>Esc: Close</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
