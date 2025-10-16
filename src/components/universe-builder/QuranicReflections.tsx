'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, BookOpen } from 'lucide-react'

export interface QuranicReflection {
  arabic: string;
  translation: string;
  transliteration: string;
  reference: string;
  context: string;
  trigger: 'perfect' | 'good' | 'special';
}

interface QuranicReflectionModalProps {
  reflection: QuranicReflection | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuranicReflectionModal({ reflection, isOpen, onClose }: QuranicReflectionModalProps) {
  if (!reflection) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-2xl w-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200/50 dark:border-amber-700/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-200/50 dark:border-amber-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                    Divine Reflection
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Quran {reflection.reference}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-amber-200/50 dark:hover:bg-amber-800/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Arabic Text */}
              <div className="text-center">
                <p 
                  className="text-2xl leading-relaxed text-amber-900 dark:text-amber-100 font-arabic"
                  style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}
                >
                  {reflection.arabic}
                </p>
              </div>

              {/* Transliteration */}
              <div className="text-center">
                <p className="text-lg italic text-amber-700 dark:text-amber-300 font-medium">
                  {reflection.transliteration}
                </p>
              </div>

              {/* Translation */}
              <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 border border-amber-200/30 dark:border-amber-700/30">
                <p className="text-lg text-amber-900 dark:text-amber-100 leading-relaxed">
                  "{reflection.translation}"
                </p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-medium">
                  — Quran {reflection.reference}
                </p>
              </div>

              {/* Context */}
              <div className="bg-gradient-to-r from-amber-100/50 to-orange-100/50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-4 border border-amber-200/30 dark:border-amber-700/30">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Reflection on Creation:
                </h4>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                  {reflection.context}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="text-center text-xs text-amber-600 dark:text-amber-400">
                <p>May this reflection deepen your contemplation of Allah's creation</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Quranic reflections data
export const quranicReflections = {
  beginning: {
    arabic: 'وَإِنَّا لَمُوسِعُونَ',
    translation: 'And it is We who are steadily expanding it',
    transliteration: 'Wa inna la-musi\'un',
    reference: '51:47',
    context: "This verse speaks to the expanding universe, a reality discovered by modern cosmology. The precise conditions you've created mirror the divine wisdom in setting the initial parameters of our cosmos.",
    trigger: 'perfect' as const
  },
  matter: {
    arabic: 'وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ',
    translation: 'And We made from water every living thing',
    transliteration: 'Wa ja\'alna min al-ma\'i kulla shay\'in hayy',
    reference: '21:30',
    context: "The formation of stable matter you've achieved reflects the divine precision in creating the building blocks of life. Every atom is a testament to perfect design.",
    trigger: 'perfect' as const
  },
  starlight: {
    arabic: 'وَجَعَلْنَا السِّرَاجَ وَهَّاجًا',
    translation: 'And We made [therein] a burning lamp',
    transliteration: 'Wa ja\'alna as-siraja wahhajan',
    reference: '78:13',
    context: "The stars you've ignited echo the divine creation of celestial furnaces that forge the elements of life. Each star is a lamp illuminating the cosmic darkness.",
    trigger: 'perfect' as const
  },
  galacticHeart: {
    arabic: 'وَكُلُّ شَيْءٍ عِندَهُ بِمِقْدَارٍ',
    translation: 'And everything with Him is in due proportion',
    transliteration: 'Wa kullu shay\'in \'indahu bi-miqdaar',
    reference: '13:8',
    context: "The perfect balance you've achieved between creation and destruction in your galaxy's heart reflects the divine principle of measured proportion. Even the most violent cosmic forces serve the greater purpose of nurturing life.",
    trigger: 'perfect' as const
  },
  planets: {
    arabic: 'وَالْأَرْضَ مَدَدْنَاهَا وَأَلْقَيْنَا فِيهَا رَوَاسِيَ وَأَنبَتْنَا فِيهَا مِن كُلِّ شَيْءٍ مَّوْزُونٍ',
    translation: 'And the earth - We have spread it and cast therein firmly set mountains and made to grow therein all kinds of things in good proportion',
    transliteration: 'Wal-arda madadnaha wa alqayna fiha rawasiya wa anbatnaa fiha min kulli shay\'in mawzun',
    reference: '15:19',
    context: "The habitable world you've crafted reflects Allah's wisdom in creating Earth in perfect balance - not too hot, not too cold, but precisely calibrated for life to flourish.",
    trigger: 'perfect' as const
  },
  abiogenesis: {
    arabic: 'وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ أَفَلَا يُؤْمِنُونَ',
    translation: 'And We made from water every living thing; then will they not believe?',
    transliteration: 'Wa ja\'alna min al-ma\'i kulla shay\'in hayy; afala yu\'minun',
    reference: '21:30',
    context: "The chemical pathways you've witnessed from simple molecules to self-replicating systems reflect the divine wisdom in creating life from the most basic elements. Every step from amino acids to genetic codes bears witness to purposeful design.",
    trigger: 'perfect' as const
  },
  life: {
    arabic: 'وَاللَّهُ خَلَقَ كُلَّ دَابَّةٍ مِن مَّاءٍ',
    translation: 'And Allah has created every living creature from water',
    transliteration: 'Wallahu khalaqa kulla dabbatin min ma\'',
    reference: '24:45',
    context: "The emergence of life you've witnessed mirrors the divine miracle of bringing forth consciousness from simple elements. Every living cell bears witness to the Creator's artistry.",
    trigger: 'perfect' as const
  },
  complexity: {
    arabic: 'سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ وَفِي أَنفُسِهِمْ حَتَّىٰ يَتَبَيَّنَ لَهُمْ أَنَّهُ الْحَقُّ',
    translation: 'We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth',
    transliteration: 'Sanurihim ayatina fi\'l-afaqi wa fi anfusihim hatta yatabayyana lahum annahu\'l-haqq',
    reference: '41:53',
    context: "The consciousness and complexity you've achieved represents the ultimate sign - beings capable of contemplating their own existence and recognizing their Creator through the cosmos.",
    trigger: 'perfect' as const
  },
  reflective: {
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ',
    translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding',
    transliteration: 'Inna fi khalqi\'s-samawati wal-ardi wakhtilafi\'l-layli wan-nahari la-ayatin li-uli\'l-albab',
    reference: '3:190',
    context: "Your journey through cosmic evolution reflects the path of those who contemplate creation with understanding. Every parameter you've adjusted reveals the infinite wisdom behind existence.",
    trigger: 'perfect' as const
  }
}
