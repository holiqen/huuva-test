import React, { FunctionComponent } from "react";
import StatusSelect from "../StatusSelect";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

const OrderBox = {
  borderRadius: "5px",
  background: "#e0e0e0",
  boxShadow: "35px 35px 70px #cacaca, -35px -35px 70px #f6f6f6",

  marginRight: "35px",
  marginTop: "35px",
};

const StatusBox = {
  display: "flex",
};

interface Items {
  name: string;
  plu: string;
  quantity: string;
  subItems?: [];
}

export interface Order {
  id: string;
  status: number;
  _created: Date;
  courier: {
    deliveryBy: string;
  };
  deliveryTime: Date;
  items: Items[];
  note?: string;
  numberOfCustomers: number;
  packaging: {
    includeCutlery: true;
  };
  pickupTime: Date;
}

interface IOrderCard {
  order: Order;
}

const OrderCard: FunctionComponent<IOrderCard> = ({ order }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const getColor = (status: number) => {
    if (status === 0) {
      return "green";
    } else if (status === 1) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <Box sx={OrderBox}>
      <Box sx={StatusBox}>
        <StatusSelect orderStatus={order.status} orderId={order.id} order={order} />
      </Box>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        style={{ border: `1px solid ${getColor(order.status)}` }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <ListItemText primary={`status: ${order.status}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`delivery by: ${order.courier.deliveryBy}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`number of customers: ${order.numberOfCustomers}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`delivery time: ${order.deliveryTime.toString().split("T", 1)}`} />
        </ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItem>
            <ListItemText primary="items" />
          </ListItem>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {order.items.map((item, index) => {
              const { name, plu, quantity, subItems } = item;
              return (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={`name: ${name}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`plu: ${plu}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`quantity: ${quantity}`} />
                  </ListItem>
                  {subItems && subItems.length > 0 && (
                    <ListItem>
                      <ListItemText primary={`sub items: ${subItems}`} />
                    </ListItem>
                  )}
                  <Divider />
                </div>
              );
            })}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default OrderCard;
