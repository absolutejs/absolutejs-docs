import { create } from 'zustand';

export type ThemeStore = {
	theme: 'light' | 'dark';
	setTheme: (theme: 'light' | 'dark') => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
	theme: 'dark',
	setTheme: (newTheme) => set({ theme: newTheme })
}));
