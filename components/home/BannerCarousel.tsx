import React, { useRef, useEffect, useState } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
const { width } = Dimensions.get("window");

export default function BannerCarousel() {
  const ref = useRef<FlatList>(null);
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL  || Constants.expoConfig?.extra?.API_BASE_URL;
console.log(API_BASE_URL,"this is the base url", process.env.EXPO_PUBLIC_API_BASE_URL ,Constants.expoConfig?.extra?.API_BASE_URL)
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/banner/all`);
        const activeBanners = res.data?.banners?.filter(b => b.isActive);
        setBanners(activeBanners || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      ref.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentIndex, banners]);

  return (
    <View style={{ height: 160 }}>
      <FlatList
        ref={ref}
        data={banners}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.bannerImage }}
            style={{ width, height: 160, resizeMode: "cover" }}
          />
        )}
      />
    </View>
  );
}
