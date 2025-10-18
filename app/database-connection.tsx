
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Alert, Platform } from "react-native";
import { useRouter, Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function DatabaseConnectionScreen() {
  const router = useRouter();
  const [connectionType, setConnectionType] = useState<'sepidar' | 'custom'>('sepidar');
  const [serverAddress, setServerAddress] = useState('');
  const [databaseName, setDatabaseName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!serverAddress || !databaseName || !username || !password) {
      Alert.alert('خطا', 'لطفا تمام فیلدها را پر کنید');
      return;
    }

    setIsConnecting(true);
    console.log('Connecting to database:', {
      type: connectionType,
      server: serverAddress,
      database: databaseName,
      username: username,
    });

    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      Alert.alert(
        'موفق',
        'اتصال به دیتابیس با موفقیت برقرار شد',
        [
          {
            text: 'بازگشت',
            onPress: () => router.back(),
          }
        ]
      );
    }, 2000);
  };

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.right" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "اتصال به دیتابیس",
          headerLeft: renderHeaderLeft,
          presentation: 'modal',
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconSymbol name="server.rack" color={colors.primary} size={48} />
            <Text style={styles.headerTitle}>اتصال به دیتابیس</Text>
            <Text style={styles.headerSubtitle}>
              اطلاعات اتصال به دیتابیس حسابداری را وارد کنید
            </Text>
          </View>

          <View style={styles.typeSelector}>
            <Pressable
              style={[
                styles.typeButton,
                connectionType === 'sepidar' && styles.typeButtonActive
              ]}
              onPress={() => setConnectionType('sepidar')}
            >
              <Text style={[
                styles.typeButtonText,
                connectionType === 'sepidar' && styles.typeButtonTextActive
              ]}>
                سپیدار سیستم
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.typeButton,
                connectionType === 'custom' && styles.typeButtonActive
              ]}
              onPress={() => setConnectionType('custom')}
            >
              <Text style={[
                styles.typeButtonText,
                connectionType === 'custom' && styles.typeButtonTextActive
              ]}>
                دیتابیس سفارشی
              </Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>آدرس سرور</Text>
              <TextInput
                style={styles.input}
                placeholder="مثال: 192.168.1.100"
                value={serverAddress}
                onChangeText={setServerAddress}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>نام دیتابیس</Text>
              <TextInput
                style={styles.input}
                placeholder="مثال: SepidarDB"
                value={databaseName}
                onChangeText={setDatabaseName}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>نام کاربری</Text>
              <TextInput
                style={styles.input}
                placeholder="نام کاربری دیتابیس"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>رمز عبور</Text>
              <TextInput
                style={styles.input}
                placeholder="رمز عبور دیتابیس"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          </View>

          <Pressable
            style={[styles.connectButton, isConnecting && styles.connectButtonDisabled]}
            onPress={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <Text style={styles.connectButtonText}>در حال اتصال...</Text>
            ) : (
              <>
                <Text style={styles.connectButtonText}>اتصال به دیتابیس</Text>
                <IconSymbol name="link" color="white" size={20} />
              </>
            )}
          </Pressable>

          <View style={styles.warningCard}>
            <IconSymbol name="exclamationmark.triangle.fill" color={colors.secondary} size={24} />
            <Text style={styles.warningText}>
              توجه: اطلاعات اتصال به صورت امن ذخیره می‌شود. از اتصال به شبکه‌های عمومی خودداری کنید.
            </Text>
          </View>

          <View style={styles.supabaseCard}>
            <IconSymbol name="cloud.fill" color={colors.primary} size={32} />
            <Text style={styles.supabaseTitle}>نیاز به Backend دارید؟</Text>
            <Text style={styles.supabaseText}>
              برای ذخیره‌سازی امن اطلاعات و مدیریت دیتابیس، می‌توانید از Supabase استفاده کنید.
            </Text>
            <Text style={styles.supabaseInstructions}>
              برای فعال‌سازی Supabase، روی دکمه Supabase کلیک کرده و به یک پروژه متصل شوید (ممکن است نیاز باشد ابتدا یک پروژه در Supabase ایجاد کنید).
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: 'white',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlign: 'right',
  },
  connectButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(41, 128, 185, 0.3)',
    elevation: 4,
  },
  connectButtonDisabled: {
    opacity: 0.6,
  },
  connectButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginRight: 8,
  },
  warningCard: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    marginRight: 12,
    textAlign: 'right',
    lineHeight: 18,
  },
  supabaseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  supabaseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  supabaseText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  supabaseInstructions: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  headerButtonContainer: {
    padding: 6,
  },
});
