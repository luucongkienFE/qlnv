import AddNewEmployee from "../AddNewEmployee/AddNewEmployee";

function ManageEmployee() {
    const onManageEmployee =true
    return ( <div>
        <AddNewEmployee statuses={[5,8,9,11]} onManageEmployee={onManageEmployee} />
    </div>);
}

export default ManageEmployee;