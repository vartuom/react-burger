import React from 'react';
import {data} from "../../utils/data";
import appStyles from './app.module.css';
import AppHeader from "../appHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../modal/modal";
import IngredientDetails from "../IngredientDetails/ingredientDetails";
import {testIngredient} from "../../utils/test";

function App() {

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(true);

    const onOverlayClick = () => {
        setIsOrderDetailsOpened(false);
    }

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={`${appStyles.main} pt-1 pb-10`}>
        <h1 className={`${appStyles.title} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
          {isOrderDetailsOpened &&
              <Modal onOverlayClick={onOverlayClick}>
                  <IngredientDetails ingredient={testIngredient}/>
              </Modal>
          }
      </main>
    </div>
  );
}

export default App;
