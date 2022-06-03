import { Select } from "antd"
import React from "react"
const MySelect = () => {
    const { Option } = Select;
    const handleChange = (value) => {
      };
	return (
		<div>
			<Select
				defaultValue="5"
				style={{
					width: 120
				}}
				onChange={handleChange}
			>
				<Option value='5'>5</Option>
				<Option value='10'>10</Option>
                <Option value='20'>20</Option>
                <Option value='50'>50</Option>
                <Option value='100'>100</Option>
			</Select>
		</div>
	)
}

export default MySelect
