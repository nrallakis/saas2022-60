import Header from "../components/header";
import DatePicker from "../components/DatePicker";

function DashboardPage() {
    return (
        <>
            <Header/>
            <div>
                <h1>Dashboard</h1>
                <DatePicker />
            </div>
        </>
    );
}

export default DashboardPage;