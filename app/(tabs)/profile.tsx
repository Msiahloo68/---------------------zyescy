
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";
import { Stack } from "expo-router";

export default function ProfileScreen() {
  const profileItems = [
    {
      id: 'account',
      title: 'اطلاعات حساب',
      icon: 'person.circle.fill',
      color: colors.primary,
    },
    {
      id: 'database',
      title: 'تنظیمات دیتابیس',
      icon: 'server.rack',
      color: colors.secondary,
    },
    {
      id: 'reports',
      title: 'گزارشات ذخیره شده',
      icon: 'folder.fill',
      color: colors.accent,
    },
    {
      id: 'settings',
      title: 'تنظیمات',
      icon: 'gear',
      color: colors.primary,
    },
    {
      id: 'help',
      title: 'راهنما و پشتیبانی',
      icon: 'questionmark.circle.fill',
      color: colors.secondary,
    },
    {
      id: 'about',
      title: 'درباره برنامه',
      icon: 'info.circle.fill',
      color: colors.accent,
    },
  ];

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "پروفایل",
          }}
        />
      )}
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.fill" color="white" size={48} />
            </View>
            <Text style={styles.userName}>کاربر</Text>
            <Text style={styles.userEmail}>user@example.com</Text>
          </View>

          <View style={styles.section}>
            {profileItems.map((item) => (
              <Pressable
                key={item.id}
                style={styles.menuItem}
                onPress={() => console.log('Pressed:', item.id)}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <IconSymbol name={item.icon as any} color="white" size={24} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <IconSymbol name="chevron.left" color={colors.textSecondary} size={20} />
              </Pressable>
            ))}
          </View>

          <View style={styles.versionCard}>
            <Text style={styles.versionText}>نسخه 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(41, 128, 185, 0.3)',
    elevation: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'right',
  },
  versionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
