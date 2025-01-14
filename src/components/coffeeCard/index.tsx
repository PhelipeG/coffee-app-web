import { CheckFat } from "@phosphor-icons/react";
import { Coffee, useCartStore } from "../../store/cartStore";
import { QuantityInput } from "../quantityInput";
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from "./styles";
import { useTheme } from "styled-components";

interface CoffeeCardProps {
  coffee: Coffee;
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addToCart, removeItem } = useCartStore();
  const theme = useTheme();

  function handleAddToCart() {
    addToCart(coffee);
  }
  function handleRemoveFromCart() {
    removeItem(coffee.id);
  }

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt={coffee.title} />
      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>
      <Title>{coffee.title}</Title>
      <Description>{coffee.description}</Description>
      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price.toFixed(2)}</span>
        </Price>

        <Order>
          <QuantityInput
            quantity={1}
            incrementQuantity={handleAddToCart}
            decrementQuantity={handleRemoveFromCart}
          />
          <CheckFat weight="fill" size={22} color={theme.colors["base-card"]} />
          {/* <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
          <button onClick={handleRemoveFromCart}>Remover do carrinho</button> */}
        </Order>
      </Control>
    </Container>
  );
}
