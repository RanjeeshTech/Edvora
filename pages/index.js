import styles from '../styles/Home.module.css';
import { Row, Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';

import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation";

import SwiperCore, {
  Navigation
} from 'swiper';

SwiperCore.use([Navigation]);

import { useState } from 'react';

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get('https://assessment-edvora.herokuapp.com/');
    const data = res.data;
    const states = [];
    const cities = [];
    const products = [];
    data.map(dat => {
      if (!states.includes(dat.address.state)) {
        states.push(dat.address.state);
      }
      if (!cities.includes(dat.address.city)) {
        cities.push(dat.address.city);
      }
      if (!products.includes(dat.product_name)) {
        products.push(dat.product_name);
      }
    })
    return { data, states, cities, products };
  } catch (error) {
    return { error };
  }
};

export default function Home({ data, error, states, cities, products }) {

  const [noProduct, setNoProduct] = useState(false);


  const [currentProduct, setCurrentProduct] = useState("");

  const [currentState, setCurrentState] = useState("");

  const [currentCity, setCurrentCity] = useState("");

  const [isDropOneOpen, setIsDropOneOpen] = useState(false);

  const [dropDownOneValue, setDropDownOneValue] = useState("Products");
  const [dropDownTwoValue, setDropDownTwoValue] = useState("State");
  const [dropDownThreeValue, setDropDownThreeValue] = useState("City");

  function toggleOneOpen() {
    setIsDropOneOpen(!isDropOneOpen);
  }

  const [isDropTwoOpen, setIsDropTwoOpen] = useState(false);

  function toggleTwoOpen() {
    setIsDropTwoOpen(!isDropTwoOpen);
  }

  const [isDropThreeOpen, setIsDropThreeOpen] = useState(false);

  function toggleThreeOpen() {
    setIsDropThreeOpen(!isDropThreeOpen);
  }

  function changeDropOne(e) {
    if (e.target.textContent != "All Products") {
      setCurrentProduct(e.target.textContent);
      setDropDownOneValue(e.target.textContent);
    }
    else {
      setCurrentProduct("");
      setDropDownOneValue("Products");
    }
    setNoProduct(false);
  }

  function changeDropTwo(e) {
    if (e.target.textContent != "All States") {
      setCurrentState(e.target.textContent);
      setDropDownTwoValue(e.target.textContent);
    }
    else {
      setCurrentState("");
      setDropDownTwoValue("State");
    }
    setNoProduct(false);
  }

  function changeDropThree(e) {
    if (e.target.textContent != "All Cities") {
      setCurrentCity(e.target.textContent);
      setDropDownThreeValue(e.target.textContent);
    }
    else {
      setCurrentCity("");
      setDropDownThreeValue("City");
    }
    setNoProduct(false);
  }

  return (
    <div className={styles.container}>

      <Row className='py-5 px-4'>

        <Col xl="2" lg="3" md="6" className='mx-auto'>
          <Row className={styles.filterSection}>
            <div className='mb-2 px-0' style={{ paddingBottom: "42.5px" }}>
              <Col xs="12" className='px-2' style={{ paddingTop: "24px" }}>
                <Row className={styles.filter}>
                  <p className={styles.filter_header}>Filters</p>
                </Row>
              </Col>

              <Col xs="12" className='mb-3'>
                <Dropdown isOpen={isDropOneOpen} toggle={toggleOneOpen}>
                  <DropdownToggle className={styles.drop_toggle
                  } >
                    <Row className={styles.dropdown_container} style={{ padding: "0px 10px" }}>
                      <Col xs="10" className='text-start mx-0 px-0'>
                        <p className='my-0 py-1' style={{ fontSize: "17px" }}>{dropDownOneValue}</p>
                      </Col>
                      <Col xs="2" className='my-auto text-end px-0'>
                        <FontAwesomeIcon icon={faCaretDown} color="#A5A5A5" size="lg" />
                      </Col>
                    </Row>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown_with_scroll" style={{ margin: 0 }}>
                    <DropdownItem><p onClick={changeDropOne} className='mx-auto my-0'>All Products</p></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    {
                      products.map((product, index) => {
                        return <DropdownItem key={index} className='py-2'><p onClick={changeDropOne} className='mx-auto my-0'>{product}</p></DropdownItem>
                      })
                    }
                  </DropdownMenu>
                </Dropdown>
              </Col>

              <Col xs="12" className='my-3'>
                <Dropdown isOpen={isDropTwoOpen} toggle={toggleTwoOpen}>
                  <DropdownToggle className={styles.drop_toggle}>
                    <Row className={styles.dropdown_container} style={{ padding: "0px 10px" }}>
                      <Col xs="10" className='text-start px-0'>
                        <p className='my-0 py-1' style={{ fontSize: "17px" }}>{dropDownTwoValue}</p>
                      </Col>
                      <Col xs="2" className='my-auto text-end px-0'>
                        <FontAwesomeIcon icon={faCaretDown} color="#A5A5A5" size="lg" />
                      </Col>
                    </Row>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown_with_scroll" style={{ margin: 0 }}>
                    <DropdownItem><p onClick={changeDropTwo} className='mx-auto my-0'>All States</p></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    {
                      states.map((state, index) => {
                        return <DropdownItem key={index} className='py-2'><p onClick={changeDropTwo} className='mx-auto my-0'>{state}</p></DropdownItem>
                      })
                    }
                  </DropdownMenu>
                </Dropdown>
              </Col>

              <Col xs="12" className='mt-3'>
                <Dropdown isOpen={isDropThreeOpen} toggle={toggleThreeOpen}>
                  <DropdownToggle className={styles.drop_toggle}>
                    <Row className={styles.dropdown_container} style={{ padding: "0px 10px" }}>
                      <Col xs="10" className='text-start px-0'>
                        <p className='my-0 py-1' style={{ fontSize: "17px" }}>{dropDownThreeValue}</p>
                      </Col>
                      <Col xs="2" className='my-auto text-end px-0'>
                        <FontAwesomeIcon icon={faCaretDown} color="#A5A5A5" size="lg" />
                      </Col>
                    </Row>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown_with_scroll" style={{ margin: 0 }}>
                    <DropdownItem><p onClick={changeDropThree} className='mx-auto my-0'>All Cities</p></DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    {
                      cities.map((city, index) => {
                        return <DropdownItem key={index} className='py-2'><p onClick={changeDropThree} className='mx-auto my-0'>{city}</p></DropdownItem>
                      })
                    }
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </div>

          </Row >
        </Col >

        <Col xl="10" lg="9" md="12" className='ps-lg-4 pe-lg-0 pt-lg-0 pt-5'>
          <div className='px-lg-2'>
            <div className='ps-lg-3'>
              <Row className='text-center text-lg-start'>
                <p className={styles.company_header}>Edvora</p>
              </Row>
              <Row className='text-center text-lg-start'>
                <p className={styles.products_header}>
                  Products
                </p>
              </Row>
              <Row className={styles.product_title_outer}>
                <p className={styles.product_title}>
                  Product Name
                </p>
              </Row>
            </div>
            <Row className={styles.swiper_section_1}>
              <Swiper spaceBetween={25} pagination={false} navigation={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  }
                }}
                className="mySwiper py-4 px-4">
                {
                  data.map((dat, index) => {
                    if (
                      (currentProduct == "" && currentState == "" && currentCity == "")
                      ||
                      (dat.product_name == currentProduct && dat.address.state == currentState && dat.address.city == currentCity)
                      ||
                      (dat.product_name == currentProduct && dat.address.state == currentState && currentCity == "")
                      ||
                      (dat.product_name == currentProduct && currentState == "" && dat.address.city == currentCity)
                      ||
                      (currentProduct == "" && dat.address.state == currentState && dat.address.city == currentCity)
                      ||
                      (dat.product_name == currentProduct && currentState == "" && currentState == "")
                      ||
                      (currentProduct == "" && currentState == "" && dat.address.city == currentCity)
                      ||
                      (currentProduct == "" && dat.address.state == currentState && currentCity == "")
                    ) {
                      if (!noProduct) {
                        setNoProduct(true)
                      }
                      const value_1 = new Date(dat.date);
                      const date_1 = `${('0' + value_1.getDate()).slice(-2)}:${('0' + (value_1.getMonth() + 1)).slice(-2)}:${value_1.getFullYear()}`;
                      return (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                          <Row className="product w-100 justify-content-center pt-2 pb-3 h-100" style={{ alignContent: "space-between" }}>
                            <Col xs="12">
                              <Row>
                                <Col xs="6">
                                  <Row className='pt-2'>
                                    <Col>
                                      <div style={{ width: "100%", height: "100%" }}>
                                        <img src={dat.image} alt="" width={80} height={80} style={{ borderRadius: "5px", userSelect: "none" }} />
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col xs="6">
                                  <div className='pt-1'><p className={styles.product_name}>{dat.product_name}</p></div>
                                  <div className='pt-2'><p className={styles.brand_name}>{dat.brand_name}</p></div>
                                  <div className='pt-2'><p className={styles.product_price}><span>$ </span>{dat.price}</p></div>
                                </Col>
                              </Row>
                            </Col>

                            <Col xs="12">
                              <Row className='pt-2'>
                                <Col>
                                  <p className={styles.product_location}>{dat.address.state}</p>
                                </Col>
                                <Col>
                                  <p className={styles.product_date}>Date: {date_1}</p>
                                </Col>
                              </Row>
                            </Col>

                            <Col xs="12" className='pt-2'>
                              <Row>
                                <p className={styles.product_description}>{dat.discription}</p>
                              </Row>
                            </Col>
                          </Row>
                        </SwiperSlide>
                      )
                    }
                  })
                }
                {
                  !noProduct && (
                    <SwiperSlide className={styles.swiperSlide} style={{ width: "100%" }}>
                      <Row className="product w-100 justify-content-center pt-2 pb-3 h-100" style={{ color: "#fff", alignItems: "center" }}>
                        No Results Found
                      </Row>
                    </SwiperSlide>
                  )
                }
              </Swiper>
            </Row>
          </div>

          <div className='px-lg-2 pt-5'>
            <div className='ps-3'>
              <Row className={styles.product_title_outer}>
                <p className={styles.product_title}>
                  Product Name
                </p>
              </Row>
            </div>
            <Row className={styles.swiper_section_1}>
              <Swiper watchSlidesProgress={true} spaceBetween={25} navigation={true} pagination={false}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                  }
                }}
                className="mySwiper py-4 px-4">
                {
                  data.map((dat, index) => {
                    if (
                      (currentProduct == "" && currentState == "" && currentCity == "")
                      ||
                      (dat.product_name == currentProduct && dat.address.state == currentState && dat.address.city == currentCity)
                      ||
                      (dat.product_name == currentProduct && dat.address.state == currentState && currentCity == "")
                      ||
                      (dat.product_name == currentProduct && currentState == "" && dat.address.city == currentCity)
                      ||
                      (currentProduct == "" && dat.address.state == currentState && dat.address.city == currentCity)
                      ||
                      (dat.product_name == currentProduct && currentState == "" && currentState == "")
                      ||
                      (currentProduct == "" && currentState == "" && dat.address.city == currentCity)
                      ||
                      (currentProduct == "" && dat.address.state == currentState && currentCity == "")
                    ) {
                      if (!noProduct) {
                        setNoProduct(true)
                      }
                      const value_2 = new Date(dat.date);
                      const date_2 = `${('0' + value_2.getDate()).slice(-2)}:${('0' + (value_2.getMonth() + 1)).slice(-2)}:${value_2.getFullYear()}`;
                      return (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                          <Row className="product w-100 justify-content-center pt-2 pb-3 h-100" style={{ alignContent: "space-between" }}>
                            <Col xs="12">
                              <Row>
                                <Col xs="6">
                                  <Row className='mt-1'>
                                    <Col>
                                      <div style={{ width: "100%", height: "100%" }}>
                                        <img src={dat.image} alt="" width={80} height={80} style={{ borderRadius: "5px", userSelect: "none" }} />
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col xs="6">
                                  <div className='pt-1'><p className={styles.product_name}>{dat.product_name}</p></div>
                                  <div className='pt-2'><p className={styles.brand_name}>{dat.brand_name}</p></div>
                                  <div className='pt-2'><p className={styles.product_price}><span>$ </span>{dat.price}</p></div>
                                </Col>
                              </Row>
                            </Col>

                            <Col xs="12">
                              <Row className='pt-2'>
                                <Col>
                                  <p className={styles.product_location}>{dat.address.state}</p>
                                </Col>
                                <Col>
                                  <p className={styles.product_date}>Date: {date_2}</p>
                                </Col>
                              </Row>
                            </Col>

                            <Col xs="12" className='pt-2'>
                              <Row>
                                <p className={styles.product_description}>{dat.discription}</p>
                              </Row>
                            </Col>
                          </Row>
                        </SwiperSlide>
                      )
                    }
                  })
                }
                {
                  !noProduct && (
                    <SwiperSlide className={styles.swiperSlide} style={{ width: "100%" }}>
                      <Row className="product w-100 justify-content-center pt-2 pb-3 h-100" style={{ color: "#fff", alignItems: "center" }}>
                        No Results Found
                      </Row>
                    </SwiperSlide>
                  )
                }
              </Swiper>
            </Row>
          </div>
        </Col>

      </Row >
    </div >
  )
}

