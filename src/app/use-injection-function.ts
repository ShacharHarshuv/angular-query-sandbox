import { inject, Injector, runInInjectionContext } from '@angular/core';

export function useInjectionFunction<GArgs extends any[], GReturn>(
  injectionFunction: (...args: GArgs) => GReturn,
  injector: Injector = inject(Injector),
) {
  return (...args: GArgs) =>
    runInInjectionContext(injector, () => injectionFunction(...args));
}
