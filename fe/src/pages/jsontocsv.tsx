    import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function JSONtoCSV(){


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
        const blob = new Blob([output], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "converted.csv"; // filename
        a.click();

        URL.revokeObjectURL(url); // cleanup
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
        let jsonArray: Record<string, any>[];

        try{
            jsonArray = JSON.parse(rawText);
        } catch{
            alert("Invalid Json format")
            return;
        }

        if(!Array.isArray(jsonArray) || jsonArray.length === 0){
            alert("JSON must be a non-empty array");
            return;
        }

        const headers = Object.keys(jsonArray[0]);

        //got confused here
         const rows = jsonArray.map((obj) =>
            headers.map((header) => JSON.stringify(obj[header] ?? "")).join(",")
        );

        const res = [headers.join(","), ...rows].join("\n");

        setOutput(res);

    }  

    return(
        
        <div className="px-30 pb-20 mt-10">
            
            <Link to="/" className="text-blue-600 p-1 rounded-md bg-blue-100 text-lg hover:underline hover:text-cyan-700 hover:bg-cyan-100">Home</Link>

            <div className="mt-20">
                <div className="font-bold text-3xl text-cyan-800">JSON to CSV</div>
                <div className="mt-5 text-lg">To get started, paste or upload your data.</div>
            </div>

            <div className="mt-5 flex flex-col">
                <label className="">Upload JSON file</label>
                <input className="mt-2 p-2 rounded-xl bg-zinc-100 block w-70 text-sm text-gray-800
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-cyan-600 file:text-white
                hover:file:bg-zinc-700" type="file" accept='.json' onChange={handleFileUpload}></input>
            </div>

            <div className="mt-5 flex flex-col">
                <div className="">or Paste your JSON here</div>
                <div>
                    <textarea name="input" value={input} onChange={inputChange} className="border border-slate-300 bg-slate-100 w-full h-50 mt-2"></textarea>
                </div>
            </div>

             <button className="mt-5 px-3 py-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white hover:bg-gradient-to-br focus:ring-cyan-300 dark:focus:ring-cyan-800" onClick={handleParse}>
                Convert
            </button>

            <div className="mt-5 flex flex-col">
                <div className="">CSV</div>
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