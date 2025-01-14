import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import { CoffeeList, Heading, Hero, HeroContent, Info } from "./styles";
import { useTheme } from "styled-components";
import { CoffeeCard } from "../../components/coffeeCard";
import { coffees } from "../../data/data.json";
export default function Home() {
  const theme = useTheme();
  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>
              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["yellow-dark"] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["base-text"] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>
          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>
        <img id="hero-bg" src="/images/hero-bg.svg" alt="hero-bg" />
      </Hero>
      <CoffeeList>
        <h1>Conheça nossos cafés</h1>
        <div>
          {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </CoffeeList>
    </div>
  );
}
