import React, { useRef } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";


const { width } = Dimensions.get("window");


const banners = [
{ id: "1", uri: "https://picsum.photos/seed/stock1/1200/600" },
{ id: "2", uri: "https://picsum.photos/seed/stock2/1200/600" },
{ id: "3", uri: "https://picsum.photos/seed/stock3/1200/600" },
];


export default function BannerCarousel() {
const ref = useRef<FlatList>(null);
return (
<View style={{ height: 160 }}>
<FlatList
ref={ref}
data={banners}
keyExtractor={(it) => it.id}
horizontal
pagingEnabled
showsHorizontalScrollIndicator={false}
renderItem={({ item }) => (
<Image
source={{ uri: item.uri }}
style={{ width, height: 160, resizeMode: "cover" }}
/>
)}
/>
</View>
);
}