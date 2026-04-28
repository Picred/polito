import { Outlet } from "react-router"
import { MyNavbar } from "./MyNavbar"
import { Container } from "react-bootstrap"

export const MyLayout = () => {
  return (
    <>
    <div className="vh-100 d-flex flex-column overflow-y-scroll">
      <MyNavbar />
      <Container fluid>
        <Outlet />
      </Container>
    </div>
    </>
  )
}