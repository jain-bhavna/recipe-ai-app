import React from 'react';

const FormInput = ({ label, error, className = '', floatingLabel = false, icon, ...props }) => {
    if (floatingLabel) {
        return (
            <div className="relative w-full mb-5">
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            {icon}
                        </div>
                    )}
                    <input
                        placeholder=" "
                        className={`
              peer block w-full rounded-xl border bg-gray-50 focus:bg-white
              transition-all duration-200 outline-none text-dark-900 border-gray-200
              focus:border-primary-500 focus:ring-0 placeholder-transparent
              ${icon ? 'pl-10 pr-4 pt-6 pb-2' : 'px-4 pt-6 pb-2'}
              ${error ? 'border-red-300 focus:border-red-500' : 'hover:border-gray-300'}
              ${className}
            `}
                        {...props}
                    />
                    <label
                        className={`
              absolute text-sm text-gray-400 duration-300 transform 
              -translate-y-3 scale-75 top-4 z-10 origin-[0] 
              ${icon ? 'left-10' : 'left-4'}
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base
              peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary-600
              pointer-events-none
            `}
                    >
                        {label}
                    </label>
                </div>
                {error && <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>}
            </div>
        );
    }

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-700 mb-1.5 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    className={`
            w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white
            transition-all duration-200 outline-none
            placeholder:text-gray-400 text-dark-900
            ${error
                            ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
                            : 'border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 hover:border-gray-300'
                        }
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500 ml-1">{error}</p>
            )}
        </div>
    );
};

export default FormInput;
