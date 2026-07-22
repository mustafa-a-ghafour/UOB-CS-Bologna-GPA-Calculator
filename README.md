# حاسبة معدل قسم علوم الحاسوب (جامعة بغداد) وفق مسار بولونيا
### University of Baghdad - CS Department Bologna GPA Calculator

تطبيق ويب مخصص لطلاب قسم علوم الحاسوب في جامعة بغداد لحساب المعدلات الفصلية والتراكمية بشكل فوري وتلقائي وفق نظام "مسار بولونيا" (Bologna Process) المعتمد على الوحدات الدراسية.

A responsive web application tailored for Computer Science students at the University of Baghdad to calculate semester and cumulative GPAs in real-time under the Bologna Process system.

---

## ✨ الميزات المضافة حديثاً / New Features

### 1. نظام الحساب (معدل تقديري / معدل دقيق) / Calculation System (Estimated / Precise GPA)
* **المعدل التقديري (Estimated GPA):** يحتسب ثلاثة نطاقات للمعدل (الحد الأدنى، الحد الأقصى، والمتوسط المتوقع) بناءً على التقديرات النوعية المحددة للمواد.
  * Calculates three GPA ranges (minimum, maximum, and average) based on the qualitative grades assigned to subjects.
* **المعدل الدقيق (Precise GPA):** يتيح إدخال الدرجات رقمياً مباشرة (من 50 إلى 100) واحتساب المعدل الدقيق الفعلي.
  * Allows entering numeric grades directly (from 50 to 100) to calculate the actual precise GPA.

### 2. طريقة الحساب (مرحلة واحدة / كل المراحل) / Calculation Scope (Single Stage / All Stages)
* **مرحلة واحدة (Single Stage):** حساب المعدل للمرحلة الدراسية المحددة كالمعتاد.
  * Calculates the GPA for the currently selected academic stage.
* **كل المراحل (All Stages - Cumulative GPA):** حساب المعدل التراكمي العام لكافة المراحل الأربعة معاً بناءً على إجمالي درجات المواد المدخلة ونسبة وحداتها من أصل **240 وحدة** (60 وحدة لكل مرحلة من المراحل الأربعة) لتسهيل معرفة المعدل التراكمي الكلي للمسار الدراسي.
  * Calculates the overall general cumulative GPA across all four academic stages combined, based on all entered grades and their relative weights out of **240 total credits** (60 credits per stage) to easily track the overall career GPA.

---

## 💡 فكرة المشروع / Project Concept

يقوم التطبيق بالاحتساب الفوري لـ **ثلاث قيم مختلفة للمعدل** بناءً على التقديرات النوعية المدخلة لكل مادة في وضع الحساب التقديري:
1. **الحد الأدنى للمعدل (Minimum GPA):** بناءً على أدنى درجة لكل تقدير.
2. **الحد الأقصى للمعدل (Maximum GPA):** بناءً على أعلى درجة لكل تقدير.
3. **المعدل المتوسط (Average GPA):** بناءً على المعدل الوسطي المتوقع لكل تقدير.

بينما يعرض **قيمة موحدة دقيقة للمعدل** في وضع الحساب الدقيق بناءً على الدرجات الرقمية الفعلية المدخلة.

In Estimated GPA mode, the application dynamically calculates **three distinct GPA values** based on the qualitative grades chosen for each subject:
1. **Minimum GPA:** Based on the lowest grade boundary of each selection.
2. **Maximum GPA:** Based on the highest grade boundary of each selection.
3. **Average GPA:** Based on the expected midpoint value of each selection.

In Precise GPA mode, the application displays a **single precise weighted GPA** computed directly from the exact numeric grades entered by the user.

---

## 📐 معادلة حساب المعدل / GPA Calculation Formula

يتم احتساب المعدل الرياضي الموزون بالوحدات بناءً على الصيغة التالية: / The weighted GPA is calculated according to the following formula:

$$\text{GPA} = \frac{\sum (\text{Grade Value} \times \text{Subject Credits})}{\sum \text{Credits of Graded Subjects}}$$

$$\text{المعدل} = \frac{\sum (\text{قيمة الدرجة} \times \text{عدد وحدات المادة})}{\sum \text{إجمالي وحدات المواد التي تم إدخال درجة أو تقدير صحيح لها}}$$

---

## 📂 هيكلية المشروع / Project Structure

```bash
Bologna-GPA/
│
├── index.html          # الهيكل الأساسي للصفحة وعناصر التحكم / Main page structure and controls
└── assets/
    ├── style.css       # نظام التنسيق والتصميم والتجاوب / Layout styling and responsiveness
    └── script.js       # منطق التطبيق والعمليات الحسابية / App logic and math calculations
```

---

## ✍️ إعداد وتطوير / Developed By

**مصطفى احمد غفور / Mustafa Ahmed Ghafour**
