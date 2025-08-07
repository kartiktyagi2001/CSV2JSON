    import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function CSVtoJSON(){


    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [copy, setCopy] = useState(false)

    const handleCopy = async ()=>{
        await navigator.clipboard.writeText(output);
        setCopy(true);
        setTimeout(() => setCopy(false), 1500);
        alert("Copied!")
    }

    const handleDownload = () => {
        const blob = new Blob([output], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.json"; // file name
        a.click();

        URL.revokeObjectURL(url); // clean up
    };

    const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setInput(e.target.value);
    }

    const handleFileUpload = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file) return;

        const reader = new FileReader();

        //logic to update state after reading
        reader.onload = (e)=>{
            const fileText = e.target?.result as string; //idk
            setInput(fileText);
        };

        reader.readAsText(file);
    }

    //parsing logic
    const handleParse = () =>{
        const rawText = input;

        if(!rawText.trim()){
            alert("Input cannot be empty");
            return;
        }

        //conversion logic
        const lines = rawText.trim().replace(/\r\n/g, "\n").split("\n");
        const headers = lines[0].split(",");

        const data = lines.slice(1).map((line, rowIndex) => {
            const values = line.split(",");

            if (values.length !== headers.length) {
                alert(`Row ${rowIndex + 2} does not match header length.`);
                return;
            }

            const row: Record<string, string> = {};
            headers.forEach((header, i) => {
                
                // row[header.trim()] = values[i].trim();

                let value = values[i].trim();

                // remove surrounding quotes (only if they exist) (skiiped in commented logic)
                if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
                }

                row[header.trim()] = value;


            });
            return row;
        });

        setOutput(JSON.stringify(data, null, 2));

    }  

    return(
        
        <div className="px-30 pb-20 mt-10">
            <Link to="/" className="text-blue-600 p-1 rounded-md bg-blue-100 text-lg hover:underline hover:text-cyan-700 hover:bg-cyan-100">Home</Link>
            <div className="mt-20">
                <div className="font-bold text-3xl text-cyan-800">CSV to JSON</div>
                <div className="mt-5 text-lg">To get started, paste or upload your data.</div>
            </div>

            <div className="mt-5 flex flex-col">
                <label className="">Upload CSV file</label>
                <input className="mt-2 p-2 rounded-xl bg-zinc-100 block w-70 text-sm text-gray-800
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-600 file:text-white
                hover:file:bg-zinc-700" type="file" accept='.csv' onChange={handleFileUpload}></input>
            </div>

            <div className="mt-5 flex flex-col">
                <div className="">or Paste your CSV here</div>
                <div>
                    <textarea name="input" value={input} onChange={inputChange} className="border border-slate-300 bg-slate-100 w-full h-50 mt-2"></textarea>
                </div>
            </div>

             <button className="mt-5 px-3 py-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800" onClick={handleParse}>
                Convert
            </button>

            <div className="mt-5 flex flex-col">
                <div className="">JSON</div>
                <div>
                    <textarea name="output" value={output} className="border border-slate-300 bg-slate-100 w-full h-50 mt-2"></textarea>
                </div>
            </div>

            <div className='flex gap-4'>
                <button className="mt-5 px-3 py-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800" onClick={handleDownload}>
                    Download
                </button>

                <button className="mt-5 px-3 py-1 bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-600 text-white hover:bg-gradient-to-br focus:ring-zinc-300 dark:focus:ring-zinc-800 " onClick={handleCopy}>
                    Copy to Clipboard
                </button>
            </div>
        </div>
    )

}