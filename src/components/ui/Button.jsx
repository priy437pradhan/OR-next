export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const baseClasses = 'transition-all duration-300 ease-in-out rounded';
    
    const variantClasses = {
      primary: 'bg-[var(--OR-accent-primary)] text-white border border-[var(--OR-accent-primary)] hover:bg-[var(--OR-accent-secondary)]',
      outline: 'border border-[var(--OR-accent-primary)] bg-[var(--OR-btn-outline-bg)] text-[var(--OR-accent-primary)] hover:bg-[var(--OR-accent-primary)] hover:text-white',
      signin: 'OR-signin-btn',
    };
  
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;
  
    return (
      <button className={combinedClasses} {...props}>
        {children}
      </button>
    );
  }