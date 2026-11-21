import { useState, useEffect, useCallback } from "react";
import {
  isNatureAudioPlaying,
  getCurrentAmbienceTheme,
  toggleNatureAudio,
  playNatureAudio,
  stopNatureAudio,
  setAmbienceTheme,
  subscribeNatureAudio,
} from "@/lib/nature-audio";

export function useAmbience() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<string>("water-chime");

  useEffect(() => {
    // Initial sync
    setIsPlaying(isNatureAudioPlaying());
    setCurrentTheme(getCurrentAmbienceTheme());

    // Subscribe to changes triggered anywhere in app (navbar speaker button, tour stops, etc.)
    const unsubscribe = subscribeNatureAudio((playing, theme) => {
      setIsPlaying(playing);
      setCurrentTheme(theme);
    });

    return unsubscribe;
  }, []);

  const toggle = useCallback((theme?: string) => {
    return toggleNatureAudio(theme);
  }, []);

  const play = useCallback((theme?: string) => {
    return playNatureAudio(theme);
  }, []);

  const stop = useCallback(() => {
    stopNatureAudio();
  }, []);

  const setTheme = useCallback((theme: string) => {
    setAmbienceTheme(theme);
  }, []);

  return {
    isPlaying,
    currentTheme,
    toggle,
    play,
    stop,
    setTheme,
  };
}
