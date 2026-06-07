'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

function FloatingInput({ id, label, type = 'text', value, onChange, className }: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className={cn('relative', className)}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full border border-[#0C4F6A]/20 rounded-xl px-4 pt-6 pb-2 text-sm font-body text-[#1C2B33] bg-white/60 backdrop-blur-sm focus:outline-none focus:border-[#0C4F6A] transition-colors duration-200"
      />
      <motion.label
        htmlFor={id}
        animate={isFloating ? { y: -10, scale: 0.82, x: 2 } : { y: 0, scale: 1, x: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className={cn(
          'absolute left-4 top-4 font-body text-sm pointer-events-none transition-colors duration-200',
          isFloating ? 'text-[#0C4F6A]' : 'text-[#4A6572]',
        )}
      >
        {label}
      </motion.label>
    </div>
  );
}

interface FloatingTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}

function FloatingTextarea({ id, label, value, onChange, rows = 5 }: FloatingTextareaProps) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full border border-[#0C4F6A]/20 rounded-xl px-4 pt-6 pb-2 text-sm font-body text-[#1C2B33] bg-white/60 backdrop-blur-sm focus:outline-none focus:border-[#0C4F6A] transition-colors duration-200 resize-none"
      />
      <motion.label
        htmlFor={id}
        animate={isFloating ? { y: -10, scale: 0.82, x: 2 } : { y: 0, scale: 1, x: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className={cn(
          'absolute left-4 top-4 font-body text-sm pointer-events-none transition-colors duration-200',
          isFloating ? 'text-[#0C4F6A]' : 'text-[#4A6572]',
        )}
      >
        {label}
      </motion.label>
    </div>
  );
}

export default function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center py-16 gap-4"
        >
          <CheckCircle className="w-16 h-16 text-[#0C4F6A]" strokeWidth={1.5} />
          <h3 className="font-display text-3xl text-[#0C4F6A]">Thank you!</h3>
          <p className="font-body text-[#4A6572]">We'll be in touch soon.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FloatingInput id="firstName" label="First Name" value={firstName} onChange={setFirstName} />
            <FloatingInput id="lastName" label="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <FloatingInput id="email" label="Email Address" type="email" value={email} onChange={setEmail} />
          <FloatingTextarea id="message" label="Your Message" value={message} onChange={setMessage} />
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[#0C4F6A]/30 text-[#0C4F6A] accent-[#0C4F6A] cursor-pointer"
            />
            <span className="font-body text-sm text-[#4A6572] group-hover:text-[#0C4F6A] transition-colors">
              Sign up for health news and updates
            </span>
          </label>
          <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto mt-2">
            {loading ? 'Sending…' : 'Send Message'}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
