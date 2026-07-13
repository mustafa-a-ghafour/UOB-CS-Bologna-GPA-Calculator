# حاسبة معدل قسم علوم الحاسوب (جامعة بغداد) وفق مسار بولونيا
### University of Baghdad - CS Department Bologna GPA Calculator

تطبيق ويب مخصص لطلاب قسم علوم الحاسوب في جامعة بغداد لحساب المعدلات الفصلية والتراكمية بشكل فوري وتلقائي وفق نظام "مسار بولونيا" (Bologna Process) المعتمد على الوحدات الدراسية.

A responsive web application tailored for Computer Science students at the University of Baghdad to calculate semester and cumulative GPAs in real-time under the Bologna Process system.

---

## 💡 فكرة المشروع / Project Concept

يقوم التطبيق بالاحتساب الفوري لـ **ثلاث قيم مختلفة للمعدل** بناءً على التقديرات النوعية المدخلة لكل مادة:
1. **الحد الأدنى للمعدل (Minimum GPA):** بناءً على أدنى درجة لكل تقدير.
2. **الحد الأقصى للمعدل (Maximum GPA):** بناءً على أعلى درجة لكل تقدير.
3. **المعدل المتوسط (Average GPA):** بناءً على المعدل الوسطي المتوقع لكل تقدير.

---

## 📐 معادلة حساب المعدل / GPA Calculation Formula

يتم احتساب المعدل الرياضي الموزون بالوحدات بناءً على الصيغة التالية:

$$\text{GPA} = \frac{\sum (\text{Grade Value} \times \text{Subject Credits})}{\sum \text{Credits of Graded Subjects}}$$

$$\text{المعدل} = \frac{\sum (\text{قيمة التقدير الرقمية} \times \text{عدد وحدات المادة})}{\sum \text{إجمالي وحدات المواد التي تم اختيار تقدير لها}}$$

---

## 📂 هيكلية المشروع / Project Structure

```bash
Bologna-GPA/
│
├── index.html          # الهيكل الأساسي للصفحة والعناصر وعلامات التبويب
└── assets/
    ├── style.css       # نظام التنسيق والتصميم، الألوان المتغيرة، ومتجاوب الأجهزة
    └── script.js       # قاعدة بيانات المنهج الدراسي، إدارة الأحداث، والعمليات الرياضية
```

---

## ✍️ إعداد وتطوير / Developed By

**مصطفى احمد غفور**
