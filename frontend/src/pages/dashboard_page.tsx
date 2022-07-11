import Header from "../components/header";
import DatePicker from "../components/DatePicker";
import DropBar from "../components/DropdownDashboard";

function DashboardPage() {
    return (
        <>
            <Header/>
            <div>
                <h1>Dashboard</h1>
                <DatePicker />
                <DropBar />
                <DropBar flag={true} flag2={"#/action-1"} />
            </div>
        </>
    );
}

export default DashboardPage;