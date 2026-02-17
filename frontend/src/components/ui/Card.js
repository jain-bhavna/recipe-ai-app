import React from 'react';

const Card = ({ children, className = '', hover = true, glass = false, ...props }) => {
    return (
        <div
            className={`
        relative overflow-hidden rounded-2xl 
        ${glass ? 'glass' : 'bg-white'} 
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''}
        shadow-soft border border-gray-100
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 pb-3 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
    <div className={`p-6 border-t border-gray-50 ${className}`}>{children}</div>
);

export const CardImage = ({ src, alt, tag }) => (
    <div className="relative h-48 w-full overflow-hidden">
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {tag && (
            <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-dark-800 shadow-sm">
                {tag}
            </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
);

export default Card;
