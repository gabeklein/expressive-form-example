import { Model } from '@expressive/react';
import { Ref } from 'react';

class Form extends Model {
  static bind(property: string): Ref<HTMLInputElement> {
    return this.get(form => {
      let reset: (() => void) | undefined;

      return (input) => {
        if(reset)
          reset();

        if(!input)
          return;

        if(!(property in form))
          throw new Error(`${form} has no property "${property}"`);

        const unfollow = form.get(property, x => input.value = x as string);
        const onInput = () => form.set(property, input.value);

        input.addEventListener("input", onInput);

        reset = () => {
          input.removeEventListener("input", onInput);
          unfollow();
        };
      }
    })
  }
}

export default Form;
