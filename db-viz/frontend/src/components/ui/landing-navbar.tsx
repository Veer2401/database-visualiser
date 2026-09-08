'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  /** For mobile menu: same links as nav. If provided, mobile hamburger menu is shown. */
  navItems?: { name: string; link: string }[];
  onSignIn?: () => void;
  /** Logo node shown on mobile (e.g. same as desktop logo). */
  logo?: React.ReactNode;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

export const Navbar = ({ children, className, navItems, onSignIn, logo }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <>
      <motion.div
        className={cn('fixed inset-x-0 top-4 z-40 w-full flex justify-center px-4 sm:px-6', className)}
      >
        {/* Desktop: full nav bar */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
              )
            : child,
        )}

        {/* Mobile: logo + hamburger */}
        {navItems != null && (
          <motion.div
            animate={{
              backgroundColor: visible ? 'rgba(255, 255, 255, 0.90)' : 'rgba(255, 255, 255, 0)',
              backdropFilter: visible ? 'blur(10px)' : 'none',
              boxShadow: visible ? '0 8px 20px rgba(15, 23, 42, 0.12)' : '0 0 0 rgba(0,0,0,0)',
              borderColor: visible ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 50 }}
            className="flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-3 lg:hidden border"
          >
            {logo != null ? logo : <span className="text-sm font-semibold text-gray-900">Menu</span>}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && navItems != null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-20 z-40 rounded-2xl bg-white shadow-xl border border-gray-200 py-4 lg:hidden"
            >
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    onClick={() => setMobileOpen(false)}
                    className="px-5 py-3 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                {onSignIn != null && (
                  <div className="mt-2 px-4 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        onSignIn();
                      }}
                      className={cn(
                        'w-full py-3 rounded-xl bg-black text-white text-sm font-semibold',
                        'shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-transform',
                      )}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 8px 20px rgba(15, 23, 42, 0.10)'
          : '0 0 0 rgba(0,0,0,0)',
        width: visible ? '40%' : '60%',
        y: visible ? 10 : 0,
        backgroundColor: visible ? 'rgba(255, 255, 255, 0.70)' : 'rgba(255, 255, 255, 0)',
        borderColor: visible ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0)',
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        'relative z-[60] mx-auto hidden w-full max-w-5xl flex-row items-center justify-between rounded-full px-6 py-2 lg:flex border',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800',
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

interface NavbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const NavbarButton = ({ children, className, ...props }: NavbarButtonProps) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-full bg-black text-white text-sm font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 transition duration-200',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

