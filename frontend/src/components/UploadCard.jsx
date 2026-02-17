import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';

const UploadCard = ({ file, preview, loading, onFileChange, onDragOver, onDrop, onTriggerInput, onDetect, fileInputRef, onReplace }) => {
    return (
        <div id="upload-section" className="mb-20 scroll-mt-24">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-900 mb-4">
                    Dish Detector
                </h2>
                <p className="text-lg text-dark-500 max-w-2xl mx-auto">
                    Upload or drag & drop a food image below. Our AI will analyze the ingredients and cooking style.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <Card className="p-1 border-2 border-dashed border-gray-200 hover:border-primary-400 transition-colors bg-gray-50/50">
                    <div
                        className={`
                rounded-2xl p-8 text-center transition-all duration-300 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center
                ${preview ? 'bg-dark-900' : 'bg-white'}
                `}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            className="hidden"
                            accept="image/*"
                        />

                        {preview ? (
                            <div className="w-full h-full flex flex-col items-center relative z-10 animate-fade-in">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-[300px] rounded-xl shadow-2xl mb-8 object-contain"
                                />

                                <div className="flex gap-4">
                                    <Button variant="secondary" onClick={onReplace} className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                                        Replace Photo
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={onDetect}
                                        isLoading={loading}
                                        className="px-10 shadow-lg shadow-primary-500/40"
                                    >
                                        Analyze Dish
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-10 cursor-pointer group" onClick={onTriggerInput}>
                                <div className="mx-auto h-24 w-24 rounded-full bg-primary-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-dark-900 mb-2">
                                    Drop your tasty image here
                                </h3>
                                <p className="text-dark-400 mb-8 max-w-sm mx-auto">
                                    Supports JPG, PNG, WEBP. Max size 5MB.
                                </p>
                                <Button variant="secondary" className="bg-white shadow-sm border border-gray-200">
                                    Select from Device
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default UploadCard;
