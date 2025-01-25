import { CheckFat, ShoppingCart } from "@phosphor-icons/react";
import { useCartStore } from "../../store/cartStore";
import { QuantityInput } from "../quantityInput";
import {
  ButtonCart,
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
import { useState } from "react";

interface CoffeeCardProps {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
  };
}
export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();

  function incrementQuantity() {
    setQuantity((prev) => prev + 1);
  }
  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }
  function handleAddToCart() {
    addToCart({ coffee, quantity });
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
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          <CheckFat weight="fill" size={22} color={theme.colors["base-card"]} />
          <ButtonCart onClick={handleAddToCart}>
            <ShoppingCart size={22} color={theme.colors["base-card"]} />
          </ButtonCart>
        </Order>
      </Control>
    </Container>
  );
}
