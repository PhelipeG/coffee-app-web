import { Link } from "react-router";
import { Aside, Container } from "./styles";
import { MapPin, ShoppingCart } from "@phosphor-icons/react";
import { useCartStore } from "../../store/cartStore";

export function Header() {
  const { cart } = useCartStore();
  console.log(cart);
  return (
    <Container>
      <Link to="/">
        <img src="/logo.svg" alt="logo" />
      </Link>
      <Aside>
        <div>
          <MapPin size={22} width="fill" />
          <span>Caxias,MA</span>
        </div>

        <Link to={"/cart"} aria-disabled="true">
          <ShoppingCart size={22} width="fill" />
          <span>{cart.length}</span>
        </Link>
      </Aside>
    </Container>
  );
}
