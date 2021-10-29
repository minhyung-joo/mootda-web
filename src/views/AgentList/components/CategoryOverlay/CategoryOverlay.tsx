import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import categoryIconAll from '../../../../assets/images/category_all.png';
import categoryIconBluechip from '../../../../assets/images/category_bluechip.png';
import categoryIconFinance from '../../../../assets/images/category_finance.png';
import categoryIconInternational from '../../../../assets/images/category_international.png';
import categoryIconItsw from '../../../../assets/images/category_itsw.png';
import categoryIconManage from '../../../../assets/images/category_management.png';
import categoryIconManu from '../../../../assets/images/category_manufacture.png';
import categoryIconPopular from '../../../../assets/images/category_popular.png';
import categoryIconPublic from '../../../../assets/images/category_public.png';
import categoryIconRecommended from '../../../../assets/images/category_recommended.png';
import categoryIconRnd from '../../../../assets/images/category_rnd.png';
import categoryIconSales from '../../../../assets/images/category_sales.png';
import categoryIconStartup from '../../../../assets/images/category_startup.png';


const useStyles = makeStyles(theme => {
    return {
        root: {
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 100,
        },
        container: {
            margin: 'auto',
            marginTop: 160,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
        },
        categoryRow: {
            display: 'flex',
            justifyContent: 'space-evenly',
            marginBottom: 24,
        },
        categoryItem: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        categoryCircle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
            width: 60,
            borderRadius: '50%',
            backgroundColor: 'white',
            marginBottom: 12
        },
        categoryIcon: {
            height: 30,
            width: 30,
            margin: 'auto',
        },
        categoryText: {
            color: "white",
            fontWeight: "bold"
        },
        highlighted: {
            color: "#884DFF"
        },
        highlightBorder: {
            border: "#884DFF solid 4px",
        },
    }
})

const CATEGORIES = [
    [["전체", categoryIconAll], ["인기", categoryIconPopular], ["추천", categoryIconRecommended]],
    [["대기업", categoryIconBluechip], ["스타트업", categoryIconStartup], ["외국계", categoryIconInternational]],
    [["경영지원", categoryIconManage], ["영업/마케팅", categoryIconSales], ["금융/컨설팅", categoryIconFinance]],
    [["IT/SW", categoryIconItsw], ["공정/장비", categoryIconManu], ["연구개발", categoryIconRnd]],
];

const CategoryOverlay = ({ currentCategory, onOutsideClick, onCategoryClick }) => {
    const classes = useStyles();
    const ref = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && ref.current === event.target) {
                onOutsideClick()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div
            ref={ref}
            className={classes.root}
        >
            <div className={classes.container} ref={containerRef}>
                {CATEGORIES.map((row) => {
                    return <div className={classes.categoryRow}>
                        {row.map((categoryItem) => {
                            return <div className={classes.categoryItem} onClick={() => onCategoryClick(categoryItem[0])}>
                                <div className={currentCategory === categoryItem[0] ? clsx(classes.categoryCircle, classes.highlightBorder) : classes.categoryCircle}>
                                    <img src={categoryItem[1]} className={classes.categoryIcon} />
                                </div>
                                <div className={currentCategory === categoryItem[0] ? clsx(classes.categoryText, classes.highlighted) : classes.categoryText}>
                                    {categoryItem[0]}
                                </div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
};

export default CategoryOverlay;