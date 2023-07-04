import "./createProduct.css"

export default function createProduct() {
    return (
        <>
            <div className="writeformgroup">
                <label htmlFor="fileinput">
                    <span class="material-symbols-outlined">add</span>
                </label>
                <input type="file" id="fileinput" style={{ display: "none" }} onChange={e => {
                    props.setFieldValue("file", e.target.files[0])
                    // props.handleChange
                }} name="file" />
                <input type="text" placeholder="Title" className="writeinput" onChange={props.handleChange} autoFocus={true} name="title" />
                <input type="text" placeholder="Country" className="writeinput" onChange={props.handleChange} autoFocus={true} name="country" />

                <input type="text" placeholder="Keywords" className="writeinput" onChange={props.handleChange} autoFocus={true} name="keywords" />

            </div>
            <div className="writeformgroup">
                <textarea
                    placeholder="Tell Your Strory..."
                    type="text"
                    className="writeinput"
                    name="content"
                ></textarea>
            </div>
        </>
    )
}