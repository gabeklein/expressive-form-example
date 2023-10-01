import { Model } from "@expressive/react";

class Control extends Model {
  count = 0;

  constructor(){
    super();
    this.get(() => {
      const id = setInterval(() => this.count++, 1000);
      return () => clearInterval(id);
    })
  }
}

const Thing = () => {
  const { count } = Control.use();

  color: green;
  
  <this>
    Something!!! {count}
  </this>
}

export default Thing;