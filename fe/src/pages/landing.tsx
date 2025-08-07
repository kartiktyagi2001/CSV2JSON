import { Button } from "../components/button";


export function LandingPage(){
    return(
        
        <div className=" w-full h-full">
            <div className="bg-cyan-950 p-10">
                <div className="flex flex-col items-center justify-center mt-10 gap-4 w-full">
                    <div className="text-4xl text-white font-bold text-center">
                        Your goto online data format converter
                    </div>

                    <div className="text-white font-light text-center">
                        CSV2JSON helps you quickly convert popular data formats to the format you need. Data pasted or files uploaded and converted remains local on your computer.
                    </div>
                </div>

                    <div className="flex flex-col gap-4 md:flex-row md:justify-center items-center mt-10">
                        <Button name="CSV to JSON" operation="ctoj" />
                        <Button name="SQL to JSON " operation="stoj" />
                        <Button name="JSON to CSV" operation="jtoc" />
                </div>
            </div>

            

            <div className="flex flex-col pl-10 pr-10 md:pl-30 md:pr-30 bg-zinc-50">

                <div className="mt-30 mb-10">
                    <div className="font-medium text-2xl mb-6">Confidentiality</div>

                    <div className="font-light">
                        Any data pasted and converted on CSV2JSON remains local on your computer. Data is never sent to the server.
                    </div>
                </div>

                <div className="mt-15 mb-10">
                    <div className="font-medium text-2xl mb-6">About Data Formats</div>


                    <div className="grid grid-flow-row md:grid-flow-col gap-10">
                        <div className="">
                            <div className="text-xl font-bold">CSV</div>
                            <div className=" font-light">CSV or Comma Separated Values is widely used for tabular data and often associated to spreadsheet applications like Excel.

                            Many data reporting tools output to CSV format.
                            </div>
                        </div>
                        <div>
                            <div className=" text-xl font-bold">JSON</div>
                            <div className=" font-light">JSON stands for JavaScript Object Notation and has become the defacto computer format readable by humans to store structured data.

                            From APIs to configuration files, JSON is now everywhere.
                            </div>
                        </div>
                        <div>
                            <div className=" text-xl font-bold">SQL</div>
                            <div className="font-light">CSV or SQL stands for Structured Query Language and is the standard language for relational database management systems.

                            SQL is one of the most-used languages in the tech industry.
                            </div>
                        </div>
                    </div>
                </div>

                

            </div>
            
        </div>
    )
}