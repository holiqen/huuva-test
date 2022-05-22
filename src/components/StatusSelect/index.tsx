import * as React from "react";
import { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Order } from "../OrderCard";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

interface IStatusSelect {
  orderStatus: number;
  orderId: string;
  order: Order;
}

const StatusSelect: FunctionComponent<IStatusSelect> = ({ orderStatus, orderId, order }) => {
  const [status, setStatus] = React.useState(orderStatus);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(Number(event.target.value));
  };

  const handleSubmit = () => {
    const newOrderStatus = { ...order, status: status } as Order;
    updateStatus(newOrderStatus);
  };

  const updateStatus = async (order: Order) => {
    await fetch(`http://localhost:5555/orders/${order.id}`, {
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex" }} component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status.toString()}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={0}>Done</MenuItem>
          <MenuItem value={1}>Prepare</MenuItem>
          <MenuItem value={2}>Rejected</MenuItem>
        </Select>
      </FormControl>
      <IconButton style={{ color: "green", borderRadius: "5px" }} aria-label="check" type="submit">
        <CheckIcon />
      </IconButton>
    </Box>
  );
};
export default StatusSelect;
