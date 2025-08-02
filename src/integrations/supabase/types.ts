export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          assigned_user_id: string | null
          assigned_user_name: string | null
          budget_amount: number
          budget_period: string
          clicks: number
          conversions: number
          cost_per_conversion: number
          created_at: string
          ctr: number
          id: string
          impressions: number
          name: string
          revenue: number
          status: string
          updated_at: string
        }
        Insert: {
          assigned_user_id?: string | null
          assigned_user_name?: string | null
          budget_amount?: number
          budget_period?: string
          clicks?: number
          conversions?: number
          cost_per_conversion?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          name: string
          revenue?: number
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_user_id?: string | null
          assigned_user_name?: string | null
          budget_amount?: number
          budget_period?: string
          clicks?: number
          conversions?: number
          cost_per_conversion?: number
          created_at?: string
          ctr?: number
          id?: string
          impressions?: number
          name?: string
          revenue?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      billing_data: {
        Row: {
          available_funds: number
          created_at: string
          id: string
          last_payment_amount: number | null
          last_payment_date: string | null
          updated_at: string
        }
        Insert: {
          available_funds?: number
          created_at?: string
          id?: string
          last_payment_amount?: number | null
          last_payment_date?: string | null
          updated_at?: string
        }
        Update: {
          available_funds?: number
          created_at?: string
          id?: string
          last_payment_amount?: number | null
          last_payment_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          actions: string
          active: boolean
          amount_spent: string
          bid_strategy: string
          budget: string
          cost_per_result: string
          created_at: string
          delivery: string
          id: string
          impressions: string
          name: string
          reach: string
          updated_at: string
        }
        Insert: {
          actions?: string
          active?: boolean
          amount_spent: string
          bid_strategy?: string
          budget: string
          cost_per_result: string
          created_at?: string
          delivery?: string
          id?: string
          impressions: string
          name: string
          reach: string
          updated_at?: string
        }
        Update: {
          actions?: string
          active?: boolean
          amount_spent?: string
          bid_strategy?: string
          budget?: string
          cost_per_result?: string
          created_at?: string
          delivery?: string
          id?: string
          impressions?: string
          name?: string
          reach?: string
          updated_at?: string
        }
        Relationships: []
      }
      monthly_billing: {
        Row: {
          adjustments: number
          billing_data_id: string | null
          campaigns: number
          created_at: string
          ending_balance: number
          funds_from_previous: number
          id: string
          month_name: string
          net_cost: number
          payments: number
          taxes_and_fees: number
          updated_at: string
          year: number
        }
        Insert: {
          adjustments?: number
          billing_data_id?: string | null
          campaigns?: number
          created_at?: string
          ending_balance?: number
          funds_from_previous?: number
          id?: string
          month_name: string
          net_cost?: number
          payments?: number
          taxes_and_fees?: number
          updated_at?: string
          year: number
        }
        Update: {
          adjustments?: number
          billing_data_id?: string | null
          campaigns?: number
          created_at?: string
          ending_balance?: number
          funds_from_previous?: number
          id?: string
          month_name?: string
          net_cost?: number
          payments?: number
          taxes_and_fees?: number
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "monthly_billing_billing_data_id_fkey"
            columns: ["billing_data_id"]
            isOneToOne: false
            referencedRelation: "billing_data"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
