import { useParams } from "react-router";
import { Container, Heading, Info, InfoContent, Order } from "./styles";
import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";
import { useTheme } from "styled-components";
import { useCartStore } from "../../store/cartStore";

export default function Success() {
  const { orders } = useCartStore();
  const { id } = useParams<{ id: string }>();
  const order = orders.find((i) => Number(i.id) === Number(id));
  const theme = useTheme();

  if (!order?.id) {
    return <div> Order Nao Encontrada !</div>;
  }
  // function paymentString(typePayment: string) {
  //   const typePaymentResult = typePayment;
  //   if (typePaymentResult === "cash") {
  //     return "Dinheiro";
  //   } else if (typePaymentResult === "debit") {
  //     return "Cartao de Credito";
  //   } else {
  //     return "Cartao de Debito";
  //   }
  // }
  function paymentString(typePayment: string): string {
    const paymentMethods: { [key: string]: string } = {
      cash: "Dinheiro",
      debit: "Cartão de Débito",
      credit: "Cartão de Crédito",
    };

    return paymentMethods[typePayment] || "Método de pagamento desconhecido";
  }

  return (
    <Container>
      <Order>
        <Heading>
          <h2>Uhu! Pedido confirmado</h2>
          <span>Agora é só aguardar que logo o café chegará até você</span>
        </Heading>

        <Info>
          <InfoContent>
            <div>
              <MapPin
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.purple }}
                size={32}
              />

              <div>
                <span>
                  Entrega em{" "}
                  <strong>
                    {order?.address.street}, {order?.address.number}
                  </strong>
                </span>

                <span style={{ color: "red" }}>
                  {order.address.neighborhood} - {order.address.city},{" "}
                  {order.address.state}{" "}
                </span>
              </div>
            </div>

            <div>
              <Timer
                color={theme.colors.white}
                style={{ backgroundColor: theme.colors.yellow }}
                size={32}
              />

              <div>
                <span>Previsão de entrega</span>

                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div>
              <CurrencyDollar color={theme.colors.white} size={32} />

              <div>
                <span>Pagamento na entrega</span>

                <strong>{paymentString(order.paymentMethod)}</strong>
              </div>
            </div>
          </InfoContent>
        </Info>
      </Order>

      <img src="/images/delivery.svg" alt="Pedido concluído" />
    </Container>
  );
}
