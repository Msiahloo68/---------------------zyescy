
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const reportTypes = [
    {
      id: "sales",
      title: "گزارش فروش",
      description: "گزارش کامل فروش محصولات و خدمات",
      icon: "chart.bar.fill",
      color: colors.primary,
    },
    {
      id: "purchases",
      title: "گزارش خرید",
      description: "گزارش خریدهای انجام شده",
      icon: "cart.fill",
      color: colors.secondary,
    },
    {
      id: "inventory",
      title: "گزارش موجودی",
      description: "وضعیت موجودی انبار",
      icon: "cube.box.fill",
      color: colors.accent,
    },
    {
      id: "financial",
      title: "گزارش مالی",
      description: "گزارشات مالی و حسابداری",
      icon: "dollarsign.circle.fill",
      color: colors.highlight,
    },
    {
      id: "customers",
      title: "گزارش مشتریان",
      description: "اطلاعات و تراکنش‌های مشتریان",
      icon: "person.2.fill",
      color: colors.primary,
    },
    {
      id: "suppliers",
      title: "گزارش تامین‌کنندگان",
      description: "اطلاعات تامین‌کنندگان و خریدها",
      icon: "building.2.fill",
      color: colors.secondary,
    },
  ];

  const toggleReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleGenerateReports = () => {
    if (selectedReports.length === 0) {
      console.log("No reports selected");
      return;
    }
    console.log("Generating reports:", selectedReports);
    router.push("/generate-reports");
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/database-connection")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="link" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "گزارش‌ساز حسابداری",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>انتخاب گزارشات</Text>
            <Text style={styles.headerSubtitle}>
              گزارشات مورد نظر خود را انتخاب کنید
            </Text>
          </View>

          {reportTypes.map((report) => {
            const isSelected = selectedReports.includes(report.id);
            return (
              <Pressable
                key={report.id}
                style={[
                  styles.reportCard,
                  isSelected && styles.reportCardSelected
                ]}
                onPress={() => toggleReport(report.id)}
              >
                <View style={[styles.reportIcon, { backgroundColor: report.color }]}>
                  <IconSymbol name={report.icon as any} color="white" size={28} />
                </View>
                <View style={styles.reportContent}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportDescription}>{report.description}</Text>
                </View>
                <View style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected
                ]}>
                  {isSelected && (
                    <IconSymbol name="checkmark" color="white" size={16} />
                  )}
                </View>
              </Pressable>
            );
          })}

          {selectedReports.length > 0 && (
            <Pressable
              style={styles.generateButton}
              onPress={handleGenerateReports}
            >
              <Text style={styles.generateButtonText}>
                تولید {selectedReports.length} گزارش
              </Text>
              <IconSymbol name="arrow.left" color="white" size={20} />
            </Pressable>
          )}

          <View style={styles.infoCard}>
            <IconSymbol name="info.circle.fill" color={colors.primary} size={24} />
            <Text style={styles.infoText}>
              برای اتصال به دیتابیس حسابداری، روی آیکون لینک در بالای صفحه کلیک کنید
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  reportCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reportCardSelected: {
    borderColor: colors.primary,
    boxShadow: '0px 4px 8px rgba(41, 128, 185, 0.2)',
    elevation: 4,
  },
  reportIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  reportContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(41, 128, 185, 0.3)',
    elevation: 4,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginRight: 8,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginRight: 12,
    textAlign: 'right',
    lineHeight: 20,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
