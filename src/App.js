import React, { useState } from "react";
import "./App.css";
const App=()=>{
  const [showPopup, setShowPopup]=useState(false);
  const [segmentName, setSegmentName]=useState("");
  const [schemas, setSchemas]=useState([]);
  const [availableSchemas, setAvailableSchemas]=useState([
    { label:"First Name", value: "first_name"},
    { label:"Last Name",value: "last_name"},
    { label:"Gender",value: "gender"},
    { label:"Age", value: "age"},
    { label:"Account Name",value: "account_name"},
    { label:"City",value: "city"},
    { label:"State", value: "state" },
  ]);
const [selectedSchema,setSelectedSchema]=useState("");

const togglePopup=()=>{
    setShowPopup(!showPopup);
  };
const handleAddSchema = () => {
    if (selectedSchema) {
      const selected=availableSchemas.find(
        (schema)=>schema.value === selectedSchema);
      setSchemas([...schemas, selected]);
      setAvailableSchemas(availableSchemas.filter((s) => s.value!==selectedSchema));
      setSelectedSchema("");
    }
  };
 const handleSubmit = async()=>{
    const data = {
      segment_name:segmentName,
      schema:schemas.map((schema) => {
        return {[schema.value]: schema.label };}),
    };
const webhookUrl = "https://webhook.site/f2832a0e-ab65-4b39-b6c1-edfff56c5217";
    try {
      const response = await fetch(webhookUrl,{
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Data sent successfully:", data);
      
    } catch (error) {
      console.error("Error occurred while saving the segment:", error);
     
    }
  };
  return (
    <div className="App">
      <button onClick={togglePopup}>Save segment</button>
      {showPopup && (
        <div className="popup">
        <h2>Save Segment</h2>
        <input
            type="text"
            placeholder="Segment Name"
            value={segmentName}
            onChange={(e)=>setSegmentName(e.target.value)}/>
          <div className="dropdown">
            <label>Add schema to segment:</label>
            <select
              value={selectedSchema}
              onChange={(e)=>setSelectedSchema(e.target.value)}>
              <option value="">Select a schema</option>
              {availableSchemas.map((schema)=>(
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            <button onClick={handleAddSchema}>+Add new schema</button>
          </div>
          <div className="added-schemas">
            <h3>Added Schemas:</h3>
            <div className="schema-box">
              {schemas.map((schema,index)=>(
                <div key={index} className="schema-item">
                  {schema.label}
                </div>
              ))}
            </div>
          </div>
          <button onClick={handleSubmit}>Save the segment</button>
        </div>
      )}
    </div>
  );
};

export default App;
