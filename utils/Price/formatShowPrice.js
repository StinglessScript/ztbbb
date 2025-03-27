export async function formatShowPrice(context, productGroupsFullData) {
    console.log(
        "🚀 ~ formatShowPrice ~ productGroupsFullData:",
        productGroupsFullData
    );

    async function processItem(item, context) {
        const resDiscount = await context.$sdk.product.getListPrice(
            [item.id.toString()],
            context.$route.query.store
        );

        item.dataDiscount = [];

        let listPrice = resDiscount[item.id]?.flatMap((d) => {
            if (!d?.subPrices || d?.subPrices?.length === 0) {
                return [
                    {
                        time: d?.quantity || 1,
                        type: d?.type,
                        percentDiscount: d?.discountPercent || 0,
                        price: d?.price || 0,
                        hint: d?.hint || null,
                        priceDiscount:
                            d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                        unitDTO_id: item.unitDTO?.id || 1,
                        unitDTO_name: item.unitDTO?.name || "default",
                        defaultPrice: d?.defaultPrice ? false : true,
                        attributes: {
                            value: d?.attributes?.some(
                                (a) => a.attrName == "CAMPAIN" || a.attrName == "CAMPAIGN_ACTION"
                            ),
                            campain: d?.attributes || [],
                        },
                    },
                ];
            }

            const subPriceData = d?.subPrices?.map((c) => ({
                time: c?.quantity,
                type: c?.type == "QUANTITY" ? d?.type : c?.type,
                percentDiscount: c?.discountPercent,
                price: c?.price,
                hint: c?.hint || null,
                priceDiscount: c?.displayPrice || c?.price * (c?.quantity || 1) || 0,
                unitDTO_id: item.unitDTO?.id,
                unitDTO_name: item.unitDTO?.name,
                defaultPrice: d?.defaultPrice === c.id,
                attributes: {
                    value: c?.attributes?.some(
                        (a) => a.attrName == "CAMPAIN" || a.attrName == "CAMPAIGN_ACTION"
                    ),
                    campain: c?.attributes || [],
                },
            }));

            return [
                {
                    time: d?.quantity || 1,
                    type: d?.type,
                    percentDiscount: d?.discountPercent || 0,
                    price: d?.price || 0,
                    hint: d?.hint || null,
                    priceDiscount:
                        d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                    unitDTO_id: item.unitDTO?.id || 1,
                    unitDTO_name: item.unitDTO?.name || "Tháng",
                    defaultPrice: d?.defaultPrice ? d?.defaultPrice == d?.id : true,
                    attributes: {
                        value: d?.attributes?.some(
                            (a) => a.attrName == "CAMPAIN" || a.attrName == "CAMPAIGN_ACTION"
                        ),
                        campain: d?.attributes || [],
                    },
                },
                ...subPriceData,
            ];
        });

        let filterData = [...listPrice];
        const updatedDataDiscount = [];

        filterData
            .filter((item) => item.type === "PROMOTION")
            .forEach((promotion) => {
                const matchingRentData = filterData.filter(
                    (rent) =>
                        (rent.type === "RENT" || rent.type === "SELL") &&
                        rent.time === promotion.time
                );

                if (matchingRentData.length > 0) {
                    promotion.oldPrice = matchingRentData;
                    updatedDataDiscount.push(promotion);

                    matchingRentData.forEach((rent) => {
                        const rentIndex = filterData.indexOf(rent);
                        if (rentIndex !== -1) {
                            filterData.splice(rentIndex, 1);
                        }
                    });
                } else {
                    updatedDataDiscount.push(promotion);
                }
            });

        filterData.forEach((item) => {
            if (item.type === "RENT" || item.type === "SELL") {
                updatedDataDiscount.push(item);
            }
        });

        updatedDataDiscount.forEach((price, index) => {
            price.number = index + 1;
        });

        if (updatedDataDiscount.length > 0) {
            item.dataDiscount.push(...updatedDataDiscount);
        }

        item.dataDiscount.forEach((discount) => {
            if (discount.oldPrice) {
                let defaultPriceFound = false;
                discount.oldPrice.forEach((oldItem) => {
                    if (oldItem.defaultPrice) {
                        defaultPriceFound = true;
                        oldItem.defaultPrice = false;
                    }
                });

                if (defaultPriceFound) {
                    discount.defaultPrice = true;
                }
            }
        });

        return item;
    }

    const data = await Promise.all(
        productGroupsFullData.map(async ({ product, colocation }) => {
            return {
                product: product ? await processItem(product, context) : null,
                colocation: colocation ? await processItem(colocation, context) : null,
            };
        })
    );

    console.log("🚀 ~ formatShowPrice ~ formattedData:", data);
    return data;
}
