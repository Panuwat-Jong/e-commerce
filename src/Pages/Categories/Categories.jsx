import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_PRODUCTS } from "../../Utils/BaseUrl";
import ProductCategories from "./ProductCategories/ProductCategories";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Categories() {
  let [isCategories, setIsCategories] = useState([]);
  let [categoriesList, setCategoriesList] = useState("All");
  let [category, setCategory] = useState("");

  const callDataCategories = async () => {
    let categories = ["All"];
    const response = await axios(`${BASE_URL_PRODUCTS}/categories`);
    const responseData = response.data;
    if (responseData) {
      responseData.map((item) => {
        categories.push(item.name);
      });
    }
    setIsCategories(categories);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    callDataCategories();
  }, []);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="mx-auto  w-full py-6">
      <div className="mx-4">
        <div className="flex md:flex-row flex-col gap-3 md:gap-6 lg:gap-10">
          {/* Left side  */}
          <div className="w-full md:max-w-40 flex flex-col ">
            <h1 className="text-lg font-bold mb-5 max-md:text-center max-md:text-3xl">
              Categories
            </h1>
            <ul className="max-md:hidden block">
              {isCategories.map((list, idx) => {
                return (
                  <li
                    key={idx}
                    className="max-lg:text-sm leading-7 cursor-pointer hover:underline hover:font-semibold"
                    value={idx}
                    onClick={() => {
                      setCategoriesList(list);
                    }}
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
            <div className="md:hidden sm:w-96 w-full self-center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="All"
                  onChange={handleChange}
                >
                  {isCategories.map((item, idx) => {
                    return (
                      <MenuItem
                        className="hover:bg-slate-800"
                        key={idx}
                        value={idx}
                        onClick={() => {
                          setCategoriesList(item);
                        }}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full">
            <ProductCategories
              categoriesList={categoriesList?.toLowerCase()?.replace(" ", "-")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
