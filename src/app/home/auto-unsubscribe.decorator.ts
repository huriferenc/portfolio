export default function AutoUnsubscribe() {
  return function (constructor) {
    const origin = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (const prop in this) {
        const property = this[prop];

        if (typeof property.subscribe === 'function') {
          property.unsubscribe();
        }
      }

      origin.apply();
    };
  };
}
