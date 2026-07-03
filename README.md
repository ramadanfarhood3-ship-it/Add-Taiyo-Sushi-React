# FitX

تطبيق React لتتبع برنامج تدريبي أسبوعي، بواجهة عربية RTL بالكامل.

## المميزات

- شريط أسبوعي (السبت إلى الجمعة) يعرض نسبة إنجاز كل يوم للتنقل السريع بين الأيام
- تمارين خاصة يضيفها المستخدم لكل يوم: الاسم، الجولات، التكرارات، الوزن (كجم، قابل للتعديل مباشرة)، ووقت راحة مخصص لكل تمرين
- علامات تالي (tally marks) لكل جولة، تُنجز بالترتيب بضغطة واحدة
- مؤقت راحة تلقائي في شريط سفلي (عداد دائري تنازلي + زر "+15 ثانية" + زر "تخطي" + صوت تنبيه) يبدأ عند إنهاء أي جولة غير أخيرة
- حذف تمرين منفرد أو كل تمارين اليوم مع تأكيد
- حفظ تلقائي في localStorage
- تصميم داكن رياضي، متجاوب للجوال أولاً، بخط Cairo للنصوص وخط JetBrains Mono للأرقام

## التقنيات

- React 18 + Vite
- Tailwind CSS 3
- Lucide React Icons

## التشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# بناء نسخة الإنتاج
npm run build
```

## هيكل المشروع

```
fitx-workout-tracker/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useLocalStorage.js
    ├── utils/
    │   ├── days.js
    │   └── sound.js
    └── components/
        ├── WeekBar.jsx
        ├── ExerciseCard.jsx
        ├── TallyMarks.jsx
        ├── AddExerciseForm.jsx
        ├── RestTimerBar.jsx
        └── ConfirmDialog.jsx
```

## الترخيص

للاستخدام الشخصي والتعليمي.
