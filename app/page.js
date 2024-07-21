import AddCustomer from "./components/AddCustomer";
import CustomerList from "./components/CustomerList";

export default function Home() {
  return (
    <main>
      <div class="flex flex-column">
        <div class="flex flex-row">
          <div className="text-center underline"><h1 className="">Customer</h1></div>
          <div class="absolute right-0"><AddCustomer /></div>
        </div>
        <div>
          <CustomerList />
        </div>
      </div>
    </main>
  );
}
