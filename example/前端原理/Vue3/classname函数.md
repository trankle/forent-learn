```javascript
import classNames from 'classnames';

const classNamesString = classNames(
  'button',
  { 'is-disabled': disabled },
  `${color}-background`,
  `${size}-text`
);
console.log(classNamesString); // "button is-disabled blue-background small-text"
```
