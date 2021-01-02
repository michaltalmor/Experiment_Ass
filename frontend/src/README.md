<div dir="rtl" style="padding:0 20% 0 20%">

# ברוכים הבאים למעבדה השלישית ב Vue.js !!! <img src="src/assets/logo.png" width="50" height="43.3" alt="Vue.js Logo">

<!-- ## הכנה

עבור המעבדה הזאת אני מבקש ממכם: -->

## מבוא

במעבדה היום נדבר על **Vue-Router**, **שמירת מידע בצורה גלובלית** בתוך האובייקט הראשי, ועל **עיצוב דינאמי**.

במעבדה היום ניצור את ה **Navbar** (תפריט) של האתר שלנו שיעזור לנו לנתב בין העמוד הראשי, לעמוד ההרשמה, לעמוד האישי וכן הלאה.

<!-- בנוסף נסדר ונבנה ביחד את סדר קצת יותר נכון של הדברים -->

## **_vue-router_**

הweb בנוי סביב URLs.\
כאשר אנחנו מבקשים לגשת לURL מסוים, נוצרת בקשת HTTP כדי לקבל את אותו עמוד שמקושר לURL, וכאשר הוא מגיע, העמוד מוצג לנו.\
כאשר אנחנו רוצים לגשת לעמוד אחר שמקושר בצורה מסוימת לאותו עמוד, אנחנו לרוב נלחץ על לינק לאותו עמוד שיוציא בקשת HTTP עבור אותו עמוד אחר וכן הלאה.

באפליקציית web שמתבססת על javascript, נוכל לייבא את כל העמודים (בצורה מסוימת) ולהשתמש ב**router** בשביל לקשר בין מה שמוצג כרגע לבין ה URL.\
כאשר נלחץ על קישור וה URL ישתנה, ה**router** יחליט איזה תצוגה תראה עכשיו בלי לגרום לרענון של הדף (קצת בדומה לעבודה 2).

באמצעות השימוש בrouter נוכל בעצם ליצור **SPA - single Page Application** (מכיוון שאנחנו טוענים עמוד פעם אחת ותחת אותו עמוד תיהיה לנו כל האפליקציה).

כאשר אנחנו רוצים ליצור router באפליקציית vue, נשתמש לרוב בספריית **Vue Router**.

באמצעות הספרייה הזאת נגדיר קומפוננטה (router-view) שאליה יוזרק העמוד (גם קומפוננטה) שאנחנו מסתכלים עליו.

את הקישורים לאותם עמודים נגדיר באמצעות קומפוננת router-link.

<div id="part0" dir="ltr" style="padding-left:15%;">

in routes.js:

```javascript
// import components
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";

// define routes
const routes = [.....]

// export routes
export default routes;
```

In main.js:

```javascript
// import Vue Router and install it as a plugin --> enabling this.$router and this.$route
import VueRouter from "vue-router";
Vue.use(VueRouter);

import routes from "./routes";
const router = new VueRouter({
  routes
});

new Vue({
  router, // add the router to the main Vue Object
  render: (h) => h(App)
}).$mount("#app");
```

</div>

לאחר שהגדרנו router, נצטרך לאמר לאפליקציה שלנו היכן למקם את העמוד שהגדרנו ב router עבור הנתיב שאנחנו נמצאים בו.

לרוב נעשה את זה בתוך [App.vue](src/App.task.vue) על ידי הקומפוננטה `router-view`:

<div dir="ltr" style="padding-left:15%;">

```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

</div>

על מנת להגדיר את הנתיבים והקומפוננטות של כל אחד, נשתמש בקובץ [routes.js](src/routes.js)

בתחילת הקובץ אפשר לראות שאנחנו מייבאים את הקומפוננטות שאנחנו רוצים להגדיר עבור הנתיבים:

<div id="part1" dir="ltr" style="padding-left:15%;">

```javascript
// import components
import Main from "../pages/MainPage";
import NotFound from "../pages/NotFoundPage";
```

</div>

לאחר שייבאנו את הקומפוננטות, ניצור מערך בשם routes שיכיל לנו את כל הנתיבים שלנו (<span dir="ltr">`Array<RouteConfig>`</span>).

הגדרה בסיסית של נתיב תראה בצורה הזאת:

<div dir="ltr" style="padding-left:15%;">

```javascript
{
    path: "/",
    name: "main",
    component: Main
}
```

</div>

- **path:** הנתיב לפונקציה
- **name:** שם סימבולי של הנתיב
- **component:** הקומפוננטה של הנתיב

בנוסף קיימים עוד פרמטרים כמו:

- beforeEnter: פוקנציה שתקרא לפני הכניסה לקומפוננטה
- redirect: נוכל לרשום במקום componenet לאיזה נתיב נרצה לעשות redirect

[עוד פרמטרים](https://router.vuejs.org/api/#routes)

ההפרמטר component יכול גם להכיל פונקציה שמחזירה את הקומפוננטה בצורה כזאת כך שלא צריך לייבא אותה [בחלק הראשון](#part1).

> דבר זה נותן לנו אפשרות ליצור טעינה ראשונה יותר מהירה של הדף (מכיוון שהוא לא צריך לייבא את כל הקומפוננטות על ההתחלה) ורק כאשר נרצה לגשת אליה היא תיטען.

<div dir="ltr" style="padding-left:15%;">

```javascript
component: () => import("../pages/LoginPage");
```

</div>

יש לנו אפשרות להגדיר מקרה דיפולטי כאשר לrouter לא מוגזר עמוד עבור נתיב מסוים.\
את זה נעשה באמצעות <span dir="ltr">`path: "*"`</span>

[עמוד 404](src/pages/NotFoundPage.vue)

&nbsp;

לאחר שהגדרנו את כל הנתיבים, נייצר את הrouter:

<div dir="ltr" style="padding-left:15%;">

```javascript
const router = new VueRouter({
  // mode: "hash",
  routes: routes // our routes
});
```

</div>

בכך שהגדרנו (בצורה דיפולטית) את ה mode להיות hash, בעצם הגדרנו שאחרי הנתיב הבסיסי של העמוד, יבוא /#/ ואז הנתיבים שהגדרנו (כמו login).

ה hash מסמל לנו שזה לא נתיב רגיל אלא נתיב פנימי של האפליקציה (שנקבל מהשרת את העמוד נקבל מהשרת אותו דבר לא משנה איזה נתיב רשמנו).

> האפשרות השניה של mode זה history שמבחינת נראות הוא זהה לURLים שאנחנו בדרך כלל רואים באינטרנט גם עבור אתרים שהם SPA אבל בשביל שSPA יהיה בmode של history אנחנו צריכים להגדיר דברים שלא במסגרת הקורס

עכשיו שהאפליקציה שלנו משתמשת בrouter נוכל לייצר קומפוננטה בשם `router-link` כדי לייצר לינק לנתיב:

<div dir="ltr">

```html
<router-link to="/login">
  Login
</router-link>
or
<router-link :to="{path: '/login'}">
  Login
</router-link>
or
<!-- הכי מומלץ -->
<router-link :to="{name: 'login'}">
  Login
</router-link>
```

</div>

בתוך `router-link` יש לנו property בשם to שאומר לנו מה נתיב היעד.

>

מבחינת פונקציונליות, הקומפוננטה של router-link אם נרשום רק את השדה to היא בעצם אלמנט a כך שבלחיצה היא קוראת לפונקציה .

הפונקציה הזאת היא פונקציה שנוכל להשתמש בה בקוד שלנו והיא נועדה לנווט אותנו לנתיב מסוים.\
אנחנו נרצה להשתמש בה בקוד במקרה כמו login, כך שאחרי שלחצנו על כפתור הlogin, והlogin התבצע בהצלחה, נרצה לנתב את המשתמש בחזרה לעמוד הבית בלי שהוא לוחץ כפתור.

**[קישור לדוגמאת קוד login](src/pages/LoginPage.vue)**

&nbsp;

[עוד על Vue Router](https://router.vuejs.org/)

[Vue Router HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html)

&nbsp;

## <span id="task1" style="color:yellow;"> <-- משימה 1 --> </span>

<b style="color:yellow;">

עליכם ליצור עמוד חיפוש ולהוסיף אליו קישור.

בשביל זה אנחנו צריכים:

1. ליצור קומפוננטה עבור עמוד חיפוש (תכיל בנתיים כותרת)
2. לייבא אותה ב[routes.js](src/routes.js)
3. להגדיר נתיב חדש שמשתמש בקומפוננטה שיצרתם
4. ליצור קישור ב[App.task.vue](src/App.task.vue)

> לאחר שסיימתם תוכלו לבדוק את עצמכם בכך אם אתם לוחצים על הקישור, תראו למעלה שהנתיב השתנה והתצוגה שהגדרתם היא מה שרואים

</b>

&nbsp;

### **_העברתם פרמטרים לקומפוננטה דרך הנתיב_**

על מנת שנוכל להגדיר שחלק מהנתיב שלנו הוא פרמטר (כמו שעשינו בAPI), אנחנו צריכים לרשום בנתיב שלנו איפה הם נמצאים ומי הפרמרטרים.

הדרך שבה נעשה את זה היא להוסיף נקודותיים לפני מילה מסוימת ובכך אנחנו מגידירים שאותה מילה היא הפרמטר שלנו:

<div dir="ltr" style="padding-left:15%;">

In routes.js:

```javascript
{
    path: "/user/:id",
    name: "user",
    component: User
}
```

In template:

```html
<router-link to="/user/5">
  User
</router-link>
or
<!-- הכי מומלץ -->
<router-link :to="{name:'user', params:{id: userid} }`">
  User
</router-link>
```

</div>

אם נרצה להעביר עוד פרמטרים, נציין אותם בתוך to בצורה הזאת:

<div dir="ltr" style="padding-left:15%;">

```html
<router-link :to="{ name: `user`, params: {id: userid, index: 7} }">
  User
</router-link>
```

</div>

## <span id="task2" style="color:yellow;"> <-- משימה 2 --> </span>

<b style="color:yellow;">

עליכם ליצור עמוד עבור מתכון ולהוסיף אליו קישור כך שהקישור נמצא בתוך קומפוננטת תצוגה מקדימה.

בשביל זה יש:

1. ליצור קומפוננטה עבור עמוד מתכון.\
   הקומפוננטה הזאת צריכה:

   - לקבל כפרמטר את הid של המתכון
   - לבקש בevent של created את הinfo של המתכון מהשרת

<div dir="ltr" style="padding-left:15%;">

```javascript
response = await this.axios.get(
  "https://test-for-3-2.herokuapp.com/recipes/info",
  {
    params: { id: this.$route.params.recipeId }
  }
);
```

</div>

1. לעטוף את קומפוננטת תצוגה מקדימה בrouter-link מסוג a שמקשרת לעמוד המתכון של אותו מתכון
2. להגדיר נתיב חדש שמשתמש בקומפוננטה שיצרתם

</b>

&nbsp;

### bootstrap-vue

<div dir="ltr" style="padding-left:15%;">

`"With BootstrapVue you can build responsive, mobile-first, and ARIA accessible projects on the web using Vue.js and the world's most popular front-end CSS library — Bootstrap v4."`

</div>

_[קישור לדוקומנטציה](https://bootstrap-vue.org/docs)_

הפלטפורמה bootstrap-vue מאפשרת לנו לייבא קומוננטות מוכנות מראש שהשימוש שלהם כללי כמו כפתורים, קלטים ועוד.\
אותם קומפוננטות משתמשות בעיצוב של bopotstrap ככה שאם אתם נעזרים בbootstrap כדי לעצב את האתר שלכם השילוב של הקומפוננטות יהיה הגיוני.

על מנת להוסיף את bootstrap-vue לפרויקט שלנו צריך לעשות כמה צעדים:

1. להתקין באמצעות npm: <span dir="ltr">`npm install bootstrap-vue bootstrap`</span>

2. בתוך [main.js](src/main.task.js) אנחנו רושמים:

<div dir="ltr" style="padding-left:15%;">

```javascript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
```

</div>

3. בתוך [main.js](src/main.task.js) אנחנו מייבאים ומורידים את הcomponents/plugins שאנחנו משתמשים בהם:
   > שימוש בplugins נותן לנו הרבה קומפוננטות שקשורות לנושא מסוים כמו form

<div dir="ltr" style="padding-left:15%;">

```javascript
import { BootstrapVue } from "bootstrap-vue"; // import all components (will add things that we wont use and weigh our project)
Vue.use(BootstrapVue);

import { LayoutPlugin, CardPlugin } from "bootstrap-vue"; // import just the components that we will use
Vue.use(LayoutPlugin);
Vue.use(CardPlugin);
//or
[LayoutPlugin, CardPlugin].forEach((x) => Vue.use(x));
```

</div>

בשביל ליצור טופס יש לרשותנו מגוון קומפוננטות שכולם נעטפות בקומפוננטה **b-form** שנמצאת בplugin בשם FormPlugin.

**[קישור לדוגמאת קוד](https://bootstrap-vue.org/docs/components/form)**

### Vuelidate

<div dir="ltr" style="padding-left:15%;">

`"Simple, lightweight model-based validation for Vue.js 2.0"`

</div>

המודול הזה מאפשר לנו ליצור בדיקות קלט בצורה נוחה עם בדיקות שאנחנו מייבאים מהמודול.

_[קישור לדוקומנטציה](https://vuelidate.js.org/)_

<div dir="ltr" style="padding-left:15%;">

In LoginPage.vue (script):

```javascript
import { required } from "vuelidate/lib/validators";
```

</div>

לאחר הייבוא אנחנו נשתמש בפרמטר בשם validations (בתוך הקומפוננטה) שיכיל לנו את הבדיקות:

<div dir="ltr" style="padding-left:15%;">

In LoginPage.vue (export default{}):

```javascript
validations: {
  username: { //name of parameter in data
    required // all of the validations functions
  },
  password: {
    required
  }
},
```

</div>

אחרי שהגדרנו את <span dir="ltr">`validations`</span> נוצר לנו פרמטר בתוך <span dir="ltr">`this`</span> בשם <span dir="ltr">`$v`</span>

[מידע על <span dir="ltr">`$v`</span>](https://vuelidate.js.org/#sub-v-values)

**[קישור לדוגמאת קוד login](src/pages/LoginPage.vue)**

&nbsp;

## <span id="task3" style="color:yellow;"> <-- משימה 3 --> </span>

<b style="color:yellow;">

עליכם ליצור את עמוד ההרשמה שיתכיל מלהיות זהה לעמוד הLogin שכבר קיים לכם ולתאים אותו כך שיהיה כמו Register אמור להתנהג (נממש היום Register חלקי כמובן).

בשביל זה יש:

1. ליצור קומפוננטה עבור עמוד הרשמה.
2. להעתיק אליה את התוכן של קומפוננטת login ולשנות בהתאם את התוכן.
3. להוסיף קלט של בדיקת סיסמא
4. ליצור בדיקות עבור הקלט.\
   הבדיקות צריכות להיות:

   - username: קלט חובה, אורך מינימלי=3, אורך מקסימלי=8, רק alphabet characters
   - password: קלט חובה, אורך מינימלי=5, אורך מקסימלי=10
   - confirmedPassword: קלט חובה, ערך זהה לpassword

5. להגדיר נתיב חדש שמשתמש בקומפוננטה שיצרתם

</b>

&nbsp;

## save data globaly

## Class and Style Bindings

Vue נותנת לנו את האפשרות באמצעות v-bind להגדיר בצורה דינאמית את הclass והstyle של אלמנט.
נוכל להשתמש בזה כאשר אנחנו רוצים לאמר שאלמנט מסוים יהיה עם class פעיל אם תנאי מסוים קורה.

במקרה שלנו נרצה לתת למשתמש "הצצה" לאיך יראה החלק השני של המתכונים (מתכונים אחרונים שצפה בהם) אם הוא יתחבר.

> דגש: זה רק עבור המעבדה, בעבודה אתם צריכים שני **עמודות** שבשניה במקרה של משתמש לא מחובר, יש להראות טופס התחברות

בשביל זה נרצה להוסיף לקומפוננטת "אוסף תצוגות מקדימות" בעמוד הראשי שלנו class בשם blur שיהיה נכון רק כאשר משתמש לא מחובר.

[קישור לדוקומנטציה](https://vuejs.org/v2/guide/class-and-style.html)
