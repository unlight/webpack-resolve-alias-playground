```
// RxJS since 5.5+
import { Observable as Observable1 } from 'rxjs';
import { Observable as Observable2 } from 'rxjs/Observable';
console.log(Observable2 === Observable1); // => false, but expected true
```